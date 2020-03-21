import React from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/**
 * DockMonitor 决定了 DevTools 在屏幕上显示的位置，我们可以按 control+q 
 * 切换位置，按 control+h 隐藏 DevTool
 * LogMonitor 决定了 DevTools 中显示的内容，默认包含了 action 的类型、
 * 完整的 action 参数以及 action 的处理完成后新的 state 。
 */
// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={true}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;