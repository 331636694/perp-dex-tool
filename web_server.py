from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import threading
import asyncio
from decimal import Decimal
from pathlib import Path
import dotenv
from trading_bot import TradingBot, TradingConfig
from exchanges import ExchangeFactory
import logging
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

bot_instances = {}
bot_threads = {}

def get_hedge_bot_class(exchange, v2=False):
    """Import and return the appropriate HedgeBot class."""
    try:
        if exchange.lower() == 'backpack':
            from hedge.hedge_mode_bp import HedgeBot
            return HedgeBot
        elif exchange.lower() == 'extended':
            from hedge.hedge_mode_ext import HedgeBot
            return HedgeBot
        elif exchange.lower() == 'apex':
            from hedge.hedge_mode_apex import HedgeBot
            return HedgeBot
        elif exchange.lower() == 'grvt':
            if v2:
                from hedge.hedge_mode_grvt_v2 import HedgeBot
            else:
                from hedge.hedge_mode_grvt import HedgeBot
            return HedgeBot
        elif exchange.lower() == 'edgex':
            from hedge.hedge_mode_edgex import HedgeBot
            return HedgeBot
        elif exchange.lower() == 'nado':
            from hedge.hedge_mode_nado import HedgeBot
            return HedgeBot
        else:
            raise ValueError(f"Unsupported exchange: {exchange}")
    except ImportError as e:
        logging.error(f"Error importing hedge mode implementation: {e}")
        raise

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/exchanges', methods=['GET'])
def get_exchanges():
    return jsonify({
        'exchanges': ExchangeFactory.get_supported_exchanges()
    })

@app.route('/api/hedge/exchanges', methods=['GET'])
def get_hedge_exchanges():
    return jsonify({
        'exchanges': ['backpack', 'extended', 'apex', 'grvt', 'edgex', 'nado']
    })

@app.route('/api/bot/start', methods=['POST'])
def start_bot():
    try:
        data = request.json
        
        config = TradingConfig(
            ticker=data.get('ticker', 'ETH').upper(),
            contract_id='',
            tick_size=Decimal(0),
            quantity=Decimal(str(data.get('quantity', 0.1))),
            take_profit=Decimal(str(data.get('take_profit', 0.02))),
            direction=data.get('direction', 'buy').lower(),
            max_orders=int(data.get('max_orders', 40)),
            wait_time=int(data.get('wait_time', 450)),
            exchange=data.get('exchange', 'edgex').lower(),
            grid_step=Decimal(str(data.get('grid_step', -100))),
            stop_price=Decimal(str(data.get('stop_price', -1))),
            pause_price=Decimal(str(data.get('pause_price', -1))),
            boost_mode=data.get('boost', False)
        )

        bot_id = f"{config.exchange}_{config.ticker}"
        
        if bot_id in bot_instances and bot_instances[bot_id] is not None:
            return jsonify({'success': False, 'message': 'Bot is already running'}), 400

        env_file = data.get('env_file', '.env')
        if not Path(env_file).exists():
            return jsonify({'success': False, 'message': f'Env file not found: {env_file}'}), 400
        
        dotenv.load_dotenv(env_file)

        bot = TradingBot(config)
        bot_instances[bot_id] = bot
        
        def run_bot():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                loop.run_until_complete(bot.run())
            except Exception as e:
                logging.error(f"Bot error: {e}")
            finally:
                loop.close()
                if bot_id in bot_instances:
                    bot_instances[bot_id] = None

        thread = threading.Thread(target=run_bot, daemon=True)
        thread.start()
        bot_threads[bot_id] = thread

        return jsonify({
            'success': True,
            'message': f'Bot started for {config.exchange} - {config.ticker}',
            'bot_id': bot_id
        })

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/hedge/start', methods=['POST'])
def start_hedge_bot():
    try:
        data = request.json
        
        exchange = data.get('exchange', 'backpack').lower()
        ticker = data.get('ticker', 'BTC').upper()
        size = data.get('size', 0.01)
        iterations = data.get('iterations', 20)
        fill_timeout = data.get('fill_timeout', 5)
        sleep_time = data.get('sleep_time', 0)
        max_position = data.get('max_position', 0)
        v2 = data.get('v2', False)
        
        bot_id = f"hedge_{exchange}_{ticker}"
        
        if bot_id in bot_instances and bot_instances[bot_id] is not None:
            return jsonify({'success': False, 'message': 'Bot is already running'}), 400

        env_file = data.get('env_file', '.env')
        if not Path(env_file).exists():
            return jsonify({'success': False, 'message': f'Env file not found: {env_file}'}), 400
        
        dotenv.load_dotenv(env_file)
        
        HedgeBotClass = get_hedge_bot_class(exchange, v2=v2)
        
        if v2 and exchange.lower() == 'grvt':
            bot = HedgeBotClass(
                ticker=ticker,
                order_quantity=Decimal(str(size)),
                fill_timeout=fill_timeout,
                max_position=Decimal(str(max_position))
            )
        elif exchange in ['backpack', 'edgex', 'nado', 'grvt']:
            bot = HedgeBotClass(
                ticker=ticker,
                order_quantity=Decimal(str(size)),
                fill_timeout=fill_timeout,
                iterations=iterations,
                sleep_time=sleep_time,
                max_position=Decimal(str(max_position))
            )
        else:
            bot = HedgeBotClass(
                ticker=ticker,
                order_quantity=Decimal(str(size)),
                fill_timeout=fill_timeout,
                iterations=iterations,
                sleep_time=sleep_time
            )
        
        bot_instances[bot_id] = bot
        
        def run_bot():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                loop.run_until_complete(bot.run())
            except Exception as e:
                logging.error(f"Bot error: {e}")
            finally:
                loop.close()
                if bot_id in bot_instances:
                    bot_instances[bot_id] = None

        thread = threading.Thread(target=run_bot, daemon=True)
        thread.start()
        bot_threads[bot_id] = thread

        return jsonify({
            'success': True,
            'message': f'Hedge bot started for {exchange} - {ticker}',
            'bot_id': bot_id
        })

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/bot/stop', methods=['POST'])
def stop_bot():
    try:
        data = request.json
        bot_id = data.get('bot_id')
        
        if not bot_id or bot_id not in bot_instances or bot_instances[bot_id] is None:
            return jsonify({'success': False, 'message': 'Bot is not running'}), 400

        bot = bot_instances[bot_id]
        
        if hasattr(bot, 'graceful_shutdown'):
            asyncio.create_task(bot.graceful_shutdown("Stopped by user"))
        elif hasattr(bot, 'shutdown'):
            bot.shutdown()
        
        bot_instances[bot_id] = None

        return jsonify({'success': True, 'message': f'Bot {bot_id} stopped'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/bot/status', methods=['GET'])
def get_bot_status():
    try:
        bot_id = request.args.get('bot_id')
        
        if bot_id and bot_id in bot_instances:
            bot = bot_instances[bot_id]
            if bot is not None:
                return jsonify({
                    'success': True,
                    'running': True,
                    'bot_id': bot_id,
                    'config': {
                        'exchange': bot.config.exchange,
                        'ticker': bot.config.ticker,
                        'quantity': str(bot.config.quantity),
                        'take_profit': str(bot.config.take_profit),
                        'direction': bot.config.direction,
                        'max_orders': bot.config.max_orders,
                        'wait_time': bot.config.wait_time,
                        'grid_step': str(bot.config.grid_step),
                        'stop_price': str(bot.config.stop_price),
                        'pause_price': str(bot.config.pause_price),
                        'boost_mode': bot.config.boost_mode
                    },
                    'active_orders': len(bot.active_close_orders),
                    'last_log_time': bot.last_log_time
                })
            else:
                return jsonify({'success': True, 'running': False, 'bot_id': bot_id})
        
        all_bots = []
        for bid, bot in bot_instances.items():
            if bot is not None:
                all_bots.append({
                    'bot_id': bid,
                    'running': True,
                    'exchange': bot.config.exchange,
                    'ticker': bot.config.ticker
                })
            else:
                all_bots.append({
                    'bot_id': bid,
                    'running': False
                })
        
        return jsonify({'success': True, 'bots': all_bots})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/bot/list', methods=['GET'])
def list_bots():
    try:
        bots_info = []
        for bot_id, bot in bot_instances.items():
            if bot is not None:
                bots_info.append({
                    'bot_id': bot_id,
                    'running': True,
                    'exchange': bot.config.exchange,
                    'ticker': bot.config.ticker,
                    'direction': bot.config.direction,
                    'active_orders': len(bot.active_close_orders)
                })
            else:
                bots_info.append({
                    'bot_id': bot_id,
                    'running': False
                })
        
        return jsonify({'success': True, 'bots': bots_info})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/logs', methods=['GET'])
def get_logs():
    try:
        bot_id = request.args.get('bot_id')
        limit = int(request.args.get('limit', 100))
        
        logs_dir = Path('logs')
        if not logs_dir.exists():
            return jsonify({'success': True, 'logs': []})
        
        log_files = list(logs_dir.glob('*.csv'))
        if not log_files:
            return jsonify({'success': True, 'logs': []})
        
        logs = []
        for log_file in sorted(log_files, key=lambda x: x.stat().st_mtime, reverse=True):
            if bot_id and bot_id not in log_file.name:
                continue
            
            try:
                with open(log_file, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for line in lines[-limit:]:
                        if line.strip():
                            logs.append({
                                'file': log_file.name,
                                'content': line.strip()
                            })
            except Exception as e:
                logging.error(f"Error reading log file {log_file}: {e}")
            
            if len(logs) >= limit:
                break
        
        return jsonify({'success': True, 'logs': logs[:limit]})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
