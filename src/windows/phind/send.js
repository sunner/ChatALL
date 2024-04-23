waitForElement("textarea").then((e) => {
    e.focus();
    document.execCommand("insertText", false, "{prompt}");
    waitForElement("button[type=submit]").then((e) => e.click(), console.error);
  }, console.error);
  