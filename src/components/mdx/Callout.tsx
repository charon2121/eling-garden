'use client';

import React from 'react';

type CalloutProps = {
  type?: 'info' | 'warning' | 'danger';
  children: React.ReactNode;
};

export default function Callout({ type = 'info', children }: CalloutProps) {
  const color = {
    info: 'blue',
    warning: 'orange',
    danger: 'red',
  }[type];

  return (
    <div style={{
      borderLeft: `4px solid ${color}`,
      padding: '0.5rem 1rem',
      background: '#f9f9f9',
      margin: '1rem 0'
    }}>
      <strong>{type.toUpperCase()}:</strong> {children}
    </div>
  );
}
