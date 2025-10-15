import { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function DiagnosticComponent() {
  const [diagnostics, setDiagnostics] = useState({});

  useEffect(() => {
    const info = {
      threeVersion: THREE.REVISION,
      renderer: 'WebGL',
      hasWebGL: !!window.WebGLRenderingContext,
      hasWebGL2: !!window.WebGL2RenderingContext,
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      devicePixelRatio: window.devicePixelRatio,
      userAgent: navigator.userAgent.substring(0, 50) + '...'
    };

    // 测试WebGL支持
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    info.webglSupported = !!gl;

    if (gl) {
      info.webglVendor = gl.getParameter(gl.VENDOR);
      info.webglRenderer = gl.getParameter(gl.RENDERER);
    }

    setDiagnostics(info);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      zIndex: 1000
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>诊断信息</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(diagnostics).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: '2px 5px', color: '#888' }}>{key}:</td>
              <td style={{ padding: '2px 5px' }}>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}