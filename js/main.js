fetch('https://opentdb.com/api_config.php')
    .then(response => response.json())
    .then(data => printData(data.results))

    printData(data.results)