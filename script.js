document.addEventListener('DOMContentLoaded', () => {
    let balance = 5500;
    const balanceElement = document.getElementById('balance');
    const donateButtons = document.querySelectorAll('.donate-button');
    const historyList = document.getElementById('historyList');
    const donationSection = document.getElementById('donationSection');
    const historySection = document.getElementById('historySection');
    const historyButton = document.getElementById('historyBtn');
    const donateButton = document.getElementById('donateBtn');
    const blogButton = document.getElementById('blog-btn');  

    donateButtons.forEach((btn) => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const campaignElement = this.closest('.hero-content');
            const donationInput = campaignElement.querySelector('.donation-input');
            const campaignBalanceElement = campaignElement.querySelector('.campaign-balance');
            let donationAmount = parseFloat(donationInput.value);

            if (donationAmount > 0 && donationAmount <= balance) {
                // Update campaign balance
                const currentCampaignBalance = parseFloat(campaignBalanceElement.textContent) || 0;
                const updatedCampaignBalance = currentCampaignBalance + donationAmount;
                campaignBalanceElement.textContent = `${updatedCampaignBalance} BDT`;

                // Update user balance
                balance -= donationAmount;
                balanceElement.textContent = `${balance} BDT`;

                const campaignName = campaignElement.querySelector('h1').textContent;
                const timestamp = new Date().toLocaleString();
                const historyItem = document.createElement('p');
                historyItem.textContent = `Donated ${donationAmount} BDT to ${campaignName} on ${timestamp}`;
                
                historyItem.classList.add('border-solid', 'border-2', 'rounded-xl', 'p-4', 'mb-4')
                historyList.appendChild(historyItem);                
                
                // Clear the input field
                donationInput.value = '';
            } else {
                alert("Invalid donation amount or insufficient balance.");
            }
        });
    });

    historyButton.addEventListener('click', () => {
        donationSection.classList.add('hidden');
        historySection.classList.remove('hidden');

        // Change button colors
        historyButton.classList.remove('bg-white');
        historyButton.classList.add('bg-primary');
        donateButton.classList.remove('bg-primary');
        donateButton.classList.add('bg-white');
    });

    donateButton.addEventListener('click', () => {
        historySection.classList.add('hidden');
        donationSection.classList.remove('hidden');

        // Change button colors
        donateButton.classList.remove('bg-white');
        donateButton.classList.add('bg-primary');
        historyButton.classList.remove('bg-primary');
        historyButton.classList.add('bg-white');
    });

    blogButton.addEventListener('click', ()=> {
        window.location.href = "blog.html";
    })
});
