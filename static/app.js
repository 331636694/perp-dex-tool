const API_BASE = '';

const PRESETS = [
    {
        id: 'edgex-eth-grid',
        name: 'EdgeX ETH 网格交易',
        mode: 'grid',
        exchange: 'edgex',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'edgex-btc-grid',
        name: 'EdgeX BTC 网格交易',
        mode: 'grid',
        exchange: 'edgex',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'edgex-sol-grid',
        name: 'EdgeX SOL 网格交易',
        mode: 'grid',
        exchange: 'edgex',
        ticker: 'SOL',
        direction: 'buy',
        quantity: 1,
        takeProfit: 0.025,
        maxOrders: 50,
        waitTime: 400,
        gridStep: 0.0008,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'backpack-eth-grid',
        name: 'Backpack ETH 网格交易',
        mode: 'grid',
        exchange: 'backpack',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'backpack-btc-grid',
        name: 'Backpack BTC 网格交易',
        mode: 'grid',
        exchange: 'backpack',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'backpack-sol-grid',
        name: 'Backpack SOL 网格交易',
        mode: 'grid',
        exchange: 'backpack',
        ticker: 'SOL',
        direction: 'buy',
        quantity: 1,
        takeProfit: 0.025,
        maxOrders: 50,
        waitTime: 400,
        gridStep: 0.0008,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'apex-eth-grid',
        name: 'Apex ETH 网格交易',
        mode: 'grid',
        exchange: 'apex',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'apex-btc-grid',
        name: 'Apex BTC 网格交易',
        mode: 'grid',
        exchange: 'apex',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'grvt-eth-grid',
        name: 'GRVT ETH 网格交易',
        mode: 'grid',
        exchange: 'grvt',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'grvt-btc-grid',
        name: 'GRVT BTC 网格交易',
        mode: 'grid',
        exchange: 'grvt',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'grvt-sol-grid',
        name: 'GRVT SOL 网格交易',
        mode: 'grid',
        exchange: 'grvt',
        ticker: 'SOL',
        direction: 'buy',
        quantity: 1,
        takeProfit: 0.025,
        maxOrders: 50,
        waitTime: 400,
        gridStep: 0.0008,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'extended-eth-grid',
        name: 'Extended ETH 网格交易',
        mode: 'grid',
        exchange: 'extended',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'extended-btc-grid',
        name: 'Extended BTC 网格交易',
        mode: 'grid',
        exchange: 'extended',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'nado-eth-grid',
        name: 'Nado ETH 网格交易',
        mode: 'grid',
        exchange: 'nado',
        ticker: 'ETH',
        direction: 'buy',
        quantity: 0.1,
        takeProfit: 0.02,
        maxOrders: 40,
        waitTime: 450,
        gridStep: 0.0005,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'nado-btc-grid',
        name: 'Nado BTC 网格交易',
        mode: 'grid',
        exchange: 'nado',
        ticker: 'BTC',
        direction: 'buy',
        quantity: 0.01,
        takeProfit: 0.015,
        maxOrders: 30,
        waitTime: 500,
        gridStep: 0.0003,
        stopPrice: 0,
        pausePrice: 0,
        boost: false
    },
    {
        id: 'edgex-eth-hedge',
        name: 'EdgeX ETH 对冲交易',
        mode: 'hedge',
        exchange: 'edgex',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'edgex-btc-hedge',
        name: 'EdgeX BTC 对冲交易',
        mode: 'hedge',
        exchange: 'edgex',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'backpack-eth-hedge',
        name: 'Backpack ETH 对冲交易',
        mode: 'hedge',
        exchange: 'backpack',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'backpack-btc-hedge',
        name: 'Backpack BTC 对冲交易',
        mode: 'hedge',
        exchange: 'backpack',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'apex-eth-hedge',
        name: 'Apex ETH 对冲交易',
        mode: 'hedge',
        exchange: 'apex',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'apex-btc-hedge',
        name: 'Apex BTC 对冲交易',
        mode: 'hedge',
        exchange: 'apex',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'grvt-eth-hedge',
        name: 'GRVT ETH 对冲交易',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'grvt-eth-hedge-v2',
        name: 'GRVT ETH 对冲交易 (V2)',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: true,
        envFile: '.env'
    },
    {
        id: 'grvt-btc-hedge',
        name: 'GRVT BTC 对冲交易',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'grvt-btc-hedge-v2',
        name: 'GRVT BTC 对冲交易 (V2)',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: true,
        envFile: '.env'
    },
    {
        id: 'grvt-sol-hedge',
        name: 'GRVT SOL 对冲交易',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'SOL',
        size: 1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 10,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'grvt-sol-hedge-v2',
        name: 'GRVT SOL 对冲交易 (V2)',
        mode: 'hedge',
        exchange: 'grvt',
        ticker: 'SOL',
        size: 1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 10,
        v2: true,
        envFile: '.env'
    },
    {
        id: 'extended-eth-hedge',
        name: 'Extended ETH 对冲交易',
        mode: 'hedge',
        exchange: 'extended',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'extended-btc-hedge',
        name: 'Extended BTC 对冲交易',
        mode: 'hedge',
        exchange: 'extended',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'nado-eth-hedge',
        name: 'Nado ETH 对冲交易',
        mode: 'hedge',
        exchange: 'nado',
        ticker: 'ETH',
        size: 0.1,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 1,
        v2: false,
        envFile: '.env'
    },
    {
        id: 'nado-btc-hedge',
        name: 'Nado BTC 对冲交易',
        mode: 'hedge',
        exchange: 'nado',
        ticker: 'BTC',
        size: 0.01,
        iterations: 10,
        fillTimeout: 30,
        sleepTime: 5,
        maxPosition: 0.1,
        v2: false,
        envFile: '.env'
    }
];

let refreshInterval;

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || '请求失败');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

async function loadExchanges() {
    try {
        const data = await fetchAPI('/api/exchanges');
        const select = document.getElementById('exchange');
        
        data.exchanges.forEach(exchange => {
            const option = document.createElement('option');
            option.value = exchange;
            option.textContent = exchange.toUpperCase();
            select.appendChild(option);
        });
    } catch (error) {
        showNotification('加载交易所列表失败', 'error');
    }
}

function handleModeChange() {
    const mode = document.getElementById('mode').value;
    const gridFields = document.getElementById('gridModeFields');
    const hedgeFields = document.getElementById('hedgeModeFields');
    
    if (mode === 'grid') {
        gridFields.style.display = 'block';
        hedgeFields.style.display = 'none';
    } else if (mode === 'hedge') {
        gridFields.style.display = 'none';
        hedgeFields.style.display = 'block';
    }
    
    loadPresets();
}

function loadPresets() {
    const mode = document.getElementById('mode').value;
    const presetSelect = document.getElementById('preset');
    
    presetSelect.innerHTML = '<option value="">自定义配置</option>';
    
    const filteredPresets = PRESETS.filter(preset => preset.mode === mode);
    
    filteredPresets.forEach(preset => {
        const option = document.createElement('option');
        option.value = preset.id;
        option.textContent = preset.name;
        presetSelect.appendChild(option);
    });
}

function applyPreset(presetId) {
    if (!presetId) return;
    
    const preset = PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    
    if (preset.mode === 'grid') {
        document.getElementById('exchange').value = preset.exchange;
        document.getElementById('ticker').value = preset.ticker;
        document.getElementById('direction').value = preset.direction;
        document.getElementById('quantity').value = preset.quantity;
        document.getElementById('takeProfit').value = preset.takeProfit;
        document.getElementById('maxOrders').value = preset.maxOrders;
        document.getElementById('waitTime').value = preset.waitTime;
        document.getElementById('gridStep').value = preset.gridStep;
        document.getElementById('stopPrice').value = preset.stopPrice;
        document.getElementById('pausePrice').value = preset.pausePrice;
        document.getElementById('envFile').value = preset.envFile || '.env';
        document.getElementById('boost').checked = preset.boost;
    } else if (preset.mode === 'hedge') {
        document.getElementById('hedgeExchange').value = preset.exchange;
        document.getElementById('hedgeTicker').value = preset.ticker;
        document.getElementById('size').value = preset.size;
        document.getElementById('iterations').value = preset.iterations;
        document.getElementById('fillTimeout').value = preset.fillTimeout;
        document.getElementById('sleepTime').value = preset.sleepTime;
        document.getElementById('maxPosition').value = preset.maxPosition;
        document.getElementById('hedgeEnvFile').value = preset.envFile || '.env';
        document.getElementById('v2').checked = preset.v2;
        
        handleHedgeExchangeChange();
    }
}

function handleHedgeExchangeChange() {
    const exchange = document.getElementById('hedgeExchange').value;
    const v2CheckboxGroup = document.getElementById('v2CheckboxGroup');
    
    if (exchange === 'grvt') {
        v2CheckboxGroup.style.display = 'block';
    } else {
        v2CheckboxGroup.style.display = 'none';
        document.getElementById('v2').checked = false;
    }
}

async function loadBots() {
    try {
        const data = await fetchAPI('/api/bot/list');
        const botsList = document.getElementById('botsList');
        const logBotId = document.getElementById('logBotId');
        
        if (data.bots.length === 0) {
            botsList.innerHTML = '<p class="no-data">暂无运行中的机器人</p>';
            logBotId.innerHTML = '<option value="">所有机器人</option>';
            return;
        }
        
        botsList.innerHTML = '';
        logBotId.innerHTML = '<option value="">所有机器人</option>';
        
        data.bots.forEach(bot => {
            const botCard = document.createElement('div');
            botCard.className = 'bot-card';
            
            const statusClass = bot.running ? 'running' : 'stopped';
            const statusText = bot.running ? '运行中' : '已停止';
            
            let infoHTML = '';
            if (bot.running) {
                infoHTML = `
                    <div class="bot-info">
                        <div class="bot-info-item">
                            <span>交易所:</span>
                            <span>${bot.exchange.toUpperCase()}</span>
                        </div>
                        <div class="bot-info-item">
                            <span>交易对:</span>
                            <span>${bot.ticker}</span>
                        </div>
                        <div class="bot-info-item">
                            <span>方向:</span>
                            <span>${bot.direction === 'buy' ? '做多' : '做空'}</span>
                        </div>
                        <div class="bot-info-item">
                            <span>活跃订单:</span>
                            <span>${bot.active_orders}</span>
                        </div>
                    </div>
                `;
            }
            
            botCard.innerHTML = `
                <div class="bot-header">
                    <span class="bot-title">${bot.bot_id}</span>
                    <span class="bot-status ${statusClass}">${statusText}</span>
                </div>
                ${infoHTML}
                ${bot.running ? `
                    <div class="bot-actions">
                        <button class="btn btn-danger" onclick="stopBot('${bot.bot_id}')">停止</button>
                    </div>
                ` : ''}
            `;
            
            botsList.appendChild(botCard);
            
            const option = document.createElement('option');
            option.value = bot.bot_id;
            option.textContent = bot.bot_id;
            logBotId.appendChild(option);
        });
    } catch (error) {
        console.error('加载机器人列表失败:', error);
    }
}

async function loadLogs() {
    try {
        const botId = document.getElementById('logBotId').value;
        const data = await fetchAPI(`/api/logs?bot_id=${botId}&limit=50`);
        const logsContainer = document.getElementById('logsContainer');
        
        if (data.logs.length === 0) {
            logsContainer.innerHTML = '<p class="no-data">暂无日志</p>';
            return;
        }
        
        logsContainer.innerHTML = '';
        
        data.logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <div class="timestamp">${log.file}</div>
                <div class="content">${log.content}</div>
            `;
            logsContainer.appendChild(logEntry);
        });
    } catch (error) {
        console.error('加载日志失败:', error);
    }
}

async function startBot(event) {
    event.preventDefault();
    
    const mode = document.getElementById('mode').value;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        let result;
        
        if (mode === 'grid') {
            data.quantity = parseFloat(data.quantity);
            data.takeProfit = parseFloat(data.takeProfit);
            data.maxOrders = parseInt(data.maxOrders);
            data.waitTime = parseInt(data.waitTime);
            data.gridStep = parseFloat(data.gridStep);
            data.stopPrice = parseFloat(data.stopPrice);
            data.pausePrice = parseFloat(data.pausePrice);
            data.boost = document.getElementById('boost').checked;
            
            result = await fetchAPI('/api/bot/start', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        } else if (mode === 'hedge') {
            data.size = parseFloat(data.size);
            data.iterations = parseInt(data.iterations);
            data.fillTimeout = parseInt(data.fillTimeout);
            data.sleepTime = parseInt(data.sleepTime);
            data.maxPosition = parseFloat(data.maxPosition);
            data.v2 = document.getElementById('v2').checked;
            
            result = await fetchAPI('/api/hedge/start', {
                method: 'POST',
                body: JSON.stringify({
                    exchange: data.hedgeExchange,
                    ticker: data.hedgeTicker,
                    size: data.size,
                    iterations: data.iterations,
                    fill_timeout: data.fillTimeout,
                    sleep_time: data.sleepTime,
                    max_position: data.maxPosition,
                    v2: data.v2,
                    env_file: data.hedgeEnvFile
                })
            });
        }
        
        showNotification(result.message, 'success');
        event.target.reset();
        document.getElementById('boost').checked = false;
        document.getElementById('v2').checked = false;
        handleModeChange();
        await loadBots();
    } catch (error) {
        showNotification(error.message || '启动机器人失败', 'error');
    }
}

async function stopBot(botId) {
    if (!confirm(`确定要停止机器人 ${botId} 吗？`)) {
        return;
    }
    
    try {
        const result = await fetchAPI('/api/bot/stop', {
            method: 'POST',
            body: JSON.stringify({ bot_id: botId })
        });
        
        showNotification(result.message, 'success');
        await loadBots();
    } catch (error) {
        showNotification(error.message || '停止机器人失败', 'error');
    }
}

function startAutoRefresh() {
    refreshInterval = setInterval(async () => {
        await loadBots();
        await loadLogs();
    }, 5000);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadExchanges();
    await loadBots();
    await loadLogs();
    
    document.getElementById('botForm').addEventListener('submit', startBot);
    
    document.getElementById('mode').addEventListener('change', handleModeChange);
    
    document.getElementById('preset').addEventListener('change', (e) => {
        applyPreset(e.target.value);
    });
    
    document.getElementById('hedgeExchange').addEventListener('change', handleHedgeExchangeChange);
    
    document.getElementById('refreshLogs').addEventListener('click', async () => {
        await loadLogs();
        showNotification('日志已刷新', 'success');
    });
    
    document.getElementById('logBotId').addEventListener('change', async () => {
        await loadLogs();
    });
    
    handleModeChange();
    startAutoRefresh();
});

window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});
