# Web界面使用说明

## 功能介绍

交易机器人Web界面提供了一个可视化的控制面板，用于管理和监控多个交易所的交易机器人。

## 主要功能

1. **启动机器人**：通过表单配置参数并启动交易机器人
2. **监控状态**：实时查看运行中的机器人状态
3. **停止机器人**：一键停止正在运行的机器人
4. **查看日志**：实时查看交易日志和历史记录

## 快速开始

### 方式一：Docker 部署（推荐）

#### 前置要求
- 已安装 Docker
- 已安装 Docker Compose

#### 使用 Docker Compose 一键启动

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down

# 重启容器
docker-compose restart
```

#### 使用 Docker 命令启动

```bash
# 构建镜像
docker build -t perp-dex-tools .

# 运行容器
docker run -d -p 5000:5000 --name perp-dex-tools-web perp-dex-tools

# 查看日志
docker logs -f perp-dex-tools-web

# 停止容器
docker stop perp-dex-tools-web

# 删除容器
docker rm perp-dex-tools-web
```

#### 配置说明

Docker 容器会自动挂载以下目录：
- 项目根目录到容器的 `/app` 目录（支持热重载）
- `./logs` 目录到容器的 `/app/logs` 目录（日志持久化）

环境变量配置：
- `FLASK_ENV`: 开发环境（默认 development）
- `FLASK_DEBUG`: 调试模式（默认 1）

访问地址：`http://localhost:5000`

### 方式二：本地安装

#### 1. 安装依赖

```bash
pip install flask flask-cors
```

#### 2. 启动Web服务器

**Windows:**
```bash
start_web.bat
```

**Linux/Mac:**
```bash
python web_server.py
```

#### 3. 访问界面

打开浏览器访问: `http://localhost:5000`

## 使用指南

### 预设配置

为了方便快速启动交易机器人，系统提供了多个预设配置，涵盖了不同交易所和交易对的常用参数设置。

#### 支持的预设配置

**网格交易预设：**
- EdgeX: ETH, BTC, SOL
- Backpack: ETH, BTC, SOL
- Apex: ETH, BTC
- GRVT: ETH, BTC, SOL
- Extended: ETH, BTC
- Nado: ETH, BTC

**对冲交易预设：**
- EdgeX: ETH, BTC
- Backpack: ETH, BTC
- Apex: ETH, BTC
- GRVT: ETH, BTC, SOL（包含 V2 版本）
- Extended: ETH, BTC
- Nado: ETH, BTC

#### 使用预设配置

1. 选择交易模式（网格交易或对冲交易）
2. 从"预设配置"下拉菜单中选择一个预设
3. 所有相关参数会自动填充到表单中
4. 您可以根据需要手动调整参数
5. 点击"启动机器人"按钮开始交易

### 启动机器人

1. 在"启动新机器人"表单中填写以下参数：
   - **交易所**: 选择要使用的交易所
   - **交易对**: 输入交易对符号（如 ETH, BTC, SOL）
   - **交易方向**: 选择做多或做空
   - **订单数量**: 每笔订单的数量
   - **止盈**: 止盈百分比
   - **最大订单数**: 最大同时活跃订单数
   - **等待时间**: 订单间等待时间（秒）
   - **网格步长**: 与下一个平仓订单价格的最小距离百分比（-100表示无限制）
   - **停止价格**: 达到此价格时停止交易（-1表示不停止）
   - **暂停价格**: 达到此价格时暂停交易（-1表示不暂停）
   - **环境文件**: API密钥配置文件路径（默认.env）
   - **Boost模式**: 启用快速交易模式（仅支持Backpack和Aster）

2. 点击"启动机器人"按钮

### 监控机器人

- 在"运行中的机器人"区域可以查看所有机器人的实时状态
- 显示信息包括：交易所、交易对、方向、活跃订单数
- 点击"停止"按钮可以停止对应的机器人

### 查看日志

- 在"交易日志"区域可以查看所有机器人的交易日志
- 可以通过下拉框筛选特定机器人的日志
- 点击"刷新日志"按钮手动刷新日志
- 日志每5秒自动刷新

## API接口

Web界面提供以下REST API接口：

### 获取支持的交易所
```
GET /api/exchanges
```

### 启动机器人
```
POST /api/bot/start
Content-Type: application/json

{
  "exchange": "edgex",
  "ticker": "ETH",
  "direction": "buy",
  "quantity": 0.1,
  "takeProfit": 0.02,
  "maxOrders": 40,
  "waitTime": 450,
  "gridStep": -100,
  "stopPrice": -1,
  "pausePrice": -1,
  "envFile": ".env",
  "boost": false
}
```

### 停止机器人
```
POST /api/bot/stop
Content-Type: application/json

{
  "bot_id": "edgex_ETH"
}
```

### 获取机器人状态
```
GET /api/bot/status?bot_id=edgex_ETH
```

### 获取机器人列表
```
GET /api/bot/list
```

### 获取日志
```
GET /api/logs?bot_id=edgex_ETH&limit=100
```

## 注意事项

1. 确保已正确配置.env文件中的API密钥
2. 不同的交易所可能需要不同的Python版本
3. Boost模式仅支持Backpack和Aster交易所
4. 建议在测试环境先验证配置参数
5. Web服务器默认运行在5000端口，如需修改请编辑web_server.py

## 故障排除

### Docker 相关问题

#### 容器启动失败
- 检查 Docker 是否正常运行：`docker ps`
- 检查端口 5000 是否被占用：`netstat -ano | findstr :5000` (Windows) 或 `lsof -i :5000` (Linux/Mac)
- 查看容器日志：`docker logs perp-dex-tools-web`

#### 无法访问 Web 界面
- 确认容器正在运行：`docker ps`
- 检查端口映射是否正确
- 尝试访问 `http://localhost:5000` 或 `http://127.0.0.1:5000`

#### 日志文件未持久化
- 确保 `./logs` 目录存在且有写权限
- 检查 Docker 容器的卷挂载配置

#### 热重载不生效
- Docker Compose 配置已启用卷挂载，代码修改会自动同步
- 如需重启容器：`docker-compose restart`

### 本地安装相关问题

#### 无法启动Web服务器
- 检查是否已安装Flask和Flask-CORS
- 确保端口5000未被占用

### 机器人启动失败
- 检查.env文件是否存在且配置正确
- 确认交易所API密钥有效
- 查看控制台错误信息

### 日志不显示
- 检查logs目录是否存在
- 确认机器人已成功启动并产生交易

## 技术栈

- **后端**: Flask (Python)
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 自定义CSS（响应式设计）
- **通信**: REST API + AJAX

## 开发

如需修改界面样式，请编辑 `static/style.css`
如需修改前端逻辑，请编辑 `static/app.js`
如需修改后端API，请编辑 `web_server.py`
