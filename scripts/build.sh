#!/bin/bash
# 构建脚本

cd "$(dirname "$0")/.." || exit 1

echo "构建电表FAQ系统..."
npm run build 2>&1 | tee logs/build.log
