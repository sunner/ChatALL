export function getInjectScript(script) {
    return `
      var script = document.createElement('script');
      var customScript = ${script};
      script.innerHTML = customScript;
      document.head.appendChild(script);`;
  }
  