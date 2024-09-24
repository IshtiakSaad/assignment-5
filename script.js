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

    function toggleSections(showHistory) {
        if (showHistory) {
            donationSection.classList.add('hidden');
            historySection.classList.remove('hidden');
            historyButton.classList.add('bg-primary');
            historyButton.classList.remove('bg-white');
            donateButton.classList.remove('bg-primary');
            donateButton.classList.add('bg-white');
        } else {
            historySection.classList.add('hidden');
            donationSection.classList.remove('hidden');
            donateButton.classList.add('bg-primary');
            donateButton.classList.remove('bg-white');
            historyButton.classList.remove('bg-primary');
            historyButton.classList.add('bg-white');
        }
    }

    donateButtons.forEach((btn) => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const campaignElement = this.closest('.hero-content');
            const donationInput = campaignElement.querySelector('.donation-input');
            const campaignBalanceElement = campaignElement.querySelector('.campaign-balance');
            let donationAmount = parseFloat(donationInput.value);

            // Input validation
            if (isNaN(donationAmount) || donationAmount <= 0) {
                alert("Please enter a valid donation amount greater than zero.");
                donationInput.value = ''; 
                return;
            }

            if (donationAmount > balance) {
                alert("Insufficient balance for this donation.");
                donationInput.value = ''; 
                return;
            }

            const currentCampaignBalance = parseFloat(campaignBalanceElement.textContent) || 0;
            const updatedCampaignBalance = currentCampaignBalance + donationAmount;
            campaignBalanceElement.textContent = `${updatedCampaignBalance} BDT`;

            balance -= donationAmount;
            balanceElement.textContent = `${balance} BDT`;

            const campaignName = campaignElement.querySelector('h1').textContent;
            const timestamp = new Date().toLocaleString();
            
            const historyItem = document.createElement('div');
            historyItem.classList.add('border-solid', 'border-2', 'rounded-xl', 'p-4', 'mb-4');

            const donationInfo = document.createElement('h3');
            donationInfo.innerHTML = `<b>${donationAmount} Taka is Donated for ${campaignName}</b>`;
            historyItem.appendChild(donationInfo);

            const donationDate = document.createElement('p');
            donationDate.textContent = `Date: on ${timestamp} standard time.`;
            donationDate.classList.add('text-gray-500');
            historyItem.appendChild(donationDate);

            historyList.appendChild(historyItem);

            donationInput.value = '';

            // need to check before submit
            document.getElementById('my_modal_2').showModal();
        });
    });

    historyButton.addEventListener('click', () => {
        toggleSections(true);
    });

    donateButton.addEventListener('click', () => {
        toggleSections(false);
    });

    blogButton.addEventListener('click', () => {
        window.location.href = "blog.html";
    });
});
