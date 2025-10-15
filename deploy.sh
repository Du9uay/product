#!/bin/bash

# 产品手册项目部署脚本
# 使用方法: ./deploy.sh

echo "========================================="
echo "开始部署产品手册项目..."
echo "========================================="

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_DIR="/www/wwwroot/product"  # 替换为您的实际部署目录
FRONTEND_DIR="$PROJECT_DIR/frontend"

# 检查是否在正确的目录
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}错误: 找不到 frontend 目录${NC}"
    echo "请确认您已在正确的项目目录中运行此脚本"
    exit 1
fi

# 步骤 1: 拉取最新代码
echo -e "${YELLOW}[1/5] 拉取最新代码...${NC}"
git pull origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}Git 拉取失败!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ 代码拉取成功${NC}"

# 步骤 2: 进入 frontend 目录
echo -e "${YELLOW}[2/5] 进入 frontend 目录...${NC}"
cd $FRONTEND_DIR

# 步骤 3: 安装依赖
echo -e "${YELLOW}[3/5] 安装依赖...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}依赖安装失败!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ 依赖安装成功${NC}"

# 步骤 4: 构建项目
echo -e "${YELLOW}[4/5] 构建生产版本...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ 构建成功${NC}"

# 步骤 5: 设置文件权限
echo -e "${YELLOW}[5/5] 设置文件权限...${NC}"
chown -R www:www dist
chmod -R 755 dist
echo -e "${GREEN}✓ 权限设置成功${NC}"

# 重载 Nginx
echo -e "${YELLOW}重载 Nginx 配置...${NC}"
nginx -t
if [ $? -eq 0 ]; then
    systemctl reload nginx
    echo -e "${GREEN}✓ Nginx 重载成功${NC}"
else
    echo -e "${RED}Nginx 配置测试失败!${NC}"
    exit 1
fi

echo ""
echo "========================================="
echo -e "${GREEN}部署完成!${NC}"
echo "========================================="
echo "访问您的网站查看更新"
