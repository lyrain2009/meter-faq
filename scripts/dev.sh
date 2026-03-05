#!/bin/bash
# 开发服务器启动脚本

cd "$(dirname "$0")/.." || exit 1

echo "启动电表FAQ系统开发服务器..."
npm run dev 2>&1 | tee logs/dev.log
