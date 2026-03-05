#!/bin/bash
# 生产服务器启动脚本

cd "$(dirname "$0")/.." || exit 1

echo "启动电表FAQ系统生产服务器..."
npm start 2>&1 | tee logs/start.log
