let followers = [];
let following = [];

// Fungsi untuk mengambil file JSON
function fetchData() {
    // Ambil data followers dari assets/followers.json
    fetch('followers.json')
        .then(response => response.json())  // Parse data JSON
        .then(followersData => {
            followers = followersData.map(entry => entry.string_list_data[0].value);
            
            // Ambil data following dari assets/following.json
            fetch('following.json')
                .then(response => response.json())
                .then(followingData => {
                    following = followingData.relationships_following.map(entry => entry.string_list_data[0]);
                    
                    // Tampilkan hasil non-followbacks
                    displayNonFollowBacks();
                });
        })
        .catch(error => {
            console.error('Error fetching JSON files:', error);
        });
}

// Fungsi untuk menampilkan hasil non-followbacks
function displayNonFollowBacks() {
    // Filter followers yang tidak follow back
    const notFollowingBack = following.filter(user => !followers.includes(user.value));
    const resultDiv = document.getElementById('result');

    if (notFollowingBack.length === 0) {
        resultDiv.innerHTML = `<p class="text-lg text-gray-600 text-center">All users are following you back!</p>`;
        return;
    }

    // Membuat tabel untuk menampilkan hasil dengan Tailwind styling
    let tableHTML = `
        <table class="min-w-full table-auto border-collapse">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th class="px-4 py-2 border-b text-center">No</th>
                    <th class="px-4 py-2 border-b text-center">Username</th>
                    <th class="px-4 py-2 border-b text-center">Link Instagram</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Mengisi tabel dengan data non-followback
    notFollowingBack.forEach((user, index) => {
        tableHTML += `
            <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 border-b text-center">${index + 1}</td>
                <td class="px-4 py-2 border-b text-center">${user.value}</td>
                <td class="px-4 py-2 border-b text-center">
                    <a href="${user.href}" target="_blank" class="text-blue-500 hover:underline">Visit Profile</a>
                </td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;
    resultDiv.innerHTML = tableHTML;
}

// Panggil fungsi fetchData untuk mengambil dan menampilkan data saat halaman dimuat
window.onload = fetchData;
