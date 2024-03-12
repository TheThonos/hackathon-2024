const displayEl = document.getElementById('display');
if(Date.now() > 1710262800000)
    displayEl.innerText = "Yes";
else
    displayEl.innerText = "No";