document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;
      let tablink = tabs[0].url;
      if (tablink.length > 30) {
          tablink = tablink.slice(0, 30) + ' ...';
      }
      document.getElementById('site').textContent = tablink;
  });

  document.querySelector('.scan-button').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) return;
        const original_url = tabs[0].url;
        console.log("Original URL sent:", original_url); // 🛠️ Debugging
        document.getElementById('site').textContent = original_url;

        fetch('http://localhost:8000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: original_url }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Full Server Response:", data); // 🛠️ Debugging
            console.log("Result value:", data.result); // 🛠️ Debugging
        
            if (data.result === 'SAFE' || data.result === '1') {  // 🔧 Handle both possible formats
                document.getElementById('div1').textContent = 'SAFE';
                document.getElementById('div1').style.color = 'green';
                document.getElementById('div2').textContent = '';
            } else {
                document.getElementById('div2').textContent = 'PHISHY';
                document.getElementById('div2').style.color = 'red';
                document.getElementById('div1').textContent = '';
            }
        })
        .catch(error => console.error('Error:', error));
        
    });
});
});
