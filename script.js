
function researchers() {
    return {
        researchers: [],
        searchTerm: '',
        sortKey: 'Total Citations',
        fetchData() {
            fetch('/home/user/ai-top-researchers/researchers.json')
                .then(response => response.json())
                .then(data => {
                    this.researchers = data;
                    this.$nextTick(() => {
                        const observer = lozad();
                        observer.observe();
                    });
                });
        },
        get filteredResearchers() {
            return this.researchers
                .filter(r => r.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
                .sort((a, b) => b[this.sortKey] - a[this.sortKey]);
        },
        share(platform, name) {
            const url = `https://gshubham55.github.io/ai-top-researchers/`;
            const text = `Check out ${name}, one of the top AI researchers! #AIResearch`;
            let shareUrl;
            if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            } else if (platform === 'linkedin') {
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
            }
            window.open(shareUrl, '_blank');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = lozad();
    observer.observe();
});
