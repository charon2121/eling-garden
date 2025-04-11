"use client";

import { Button, Card, Input } from "@heroui/react";

export function HeroTest() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Hero UI 测试</h2>
      
      <Card className="mb-6 p-4">
        <h3 className="mb-2 text-xl">卡片组件</h3>
        <p>这是一个简单的 Hero UI 卡片示例。</p>
      </Card>
      
      <div className="mb-6 flex flex-col gap-4">
        <Input placeholder="输入框示例" />
        <Input placeholder="密码输入框" type="password" />
      </div>
      
      <div className="flex gap-2">
        <Button>默认按钮</Button>
        <Button variant="solid">实心按钮</Button>
        <Button variant="bordered">边框按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
      </div>
    </div>
  );
} 