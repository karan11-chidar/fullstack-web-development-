
// Global dom file loaded and after is runing this function
document.addEventListener('DOMContentLoaded', function () {
    // Dom elements inputs ids
    const userName = document.getElementById('username');
    const searchBtn = document.getElementById('search-btn');
    const easyLevel = document.getElementById('easy-level');
    const mediumLevel = document.getElementById('medium-level');
    const hardLevel = document.getElementById('hard-level');
    const ranking = document.getElementById('ranking-tag');
    const accurracy = document.getElementById('accuracy-tag');
    const easyProgressBar = document.getElementById('easy-progressbar');
    const mediumProgressBar = document.getElementById('medium-progressbar');
    const hardProgressBar = document.getElementById('hard-progressbar');
    const totalSolved = document.getElementById('total-solved');
    // Input Vaildations
    function isVaildInput(username) {
        if (username.trim() === '') {
            return false
        }
        const regex = /^[a-zA-Z0-9_-]+$/;
        return regex.test(username);
    }
    // Fetching data leetcode
    async function fetchData(username) {
        try {
            searchBtn.innerText = "Searching...";
            searchBtn.disabled = true;
            const url = `https://alfa-leetcode-api.onrender.com/${username}/solved`;
            const response = await fetch(url);
            if(!response.ok) {
                alert('User not found. Please check the username and try again.');
                return;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
        finally {
            searchBtn.innerText = 'Search';
            searchBtn.disabled = false;
        }
    }

    // Calculate percentage for progress bars and circles
    function calculatePercentage(solved, total) {
        if (total === 0) return 0;
        return ((solved / total) * 100).toFixed(2);
    }

    // Updated Dom content
    function updateDom(userData) {
        if(userData===undefined) {
            return;
        }
        // Update the DOM elements with the fetched data
        const easyQuestions = userData.easySolved;
        const mediumQuestions = userData.mediumSolved;
        const hardQuestions = userData.hardSolved;
        const totalQuestions = userData.solvedProblem;
        const totalSubmission = userData.totalSubmissionNum[0].submissions;
        const acceptedSubmissions = userData.totalSubmissionNum[0].count;
    

        // update text content
        easyLevel.textContent = easyQuestions;
        mediumLevel.textContent = mediumQuestions;
        hardLevel.textContent = hardQuestions;
        // update progress circles
        document.documentElement.style.setProperty('--easy-percent', `${calculatePercentage(easyQuestions, totalQuestions)}%`);
        document.documentElement.style.setProperty('--medium-percent', `${calculatePercentage(mediumQuestions, totalQuestions)}%`);
        document.documentElement.style.setProperty('--hard-percent', `${calculatePercentage(hardQuestions, totalQuestions)}%`);

        // update ranking and accuracy
        ranking.textContent = `#${userData.ranking}`;
        accurracy.textContent = `${calculatePercentage(acceptedSubmissions, totalSubmission)}%`;

    
        // update progress bars
        totalSolved.textContent = `${totalQuestions} Solved`;
        easyProgressBar.style.width = `${calculatePercentage(easyQuestions, totalQuestions)}%`;
        mediumProgressBar.style.width = `${calculatePercentage(mediumQuestions, totalQuestions)}%`;
        hardProgressBar.style.width = `${calculatePercentage(hardQuestions, totalQuestions)}%`;

    }

    // Event listener for search button
    searchBtn.addEventListener('click',async function () {
        const username = userName.value;
        if (!isVaildInput(username)) {
            alert('Please enter a valid username (alphanumeric, underscores, or hyphens only).');
           return;
        }
        const userData = await fetchData(username);
        updateDom(userData);
        userName.value = '';
    })
})