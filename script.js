const apikey = "f3ca553ae20249648ac8ef34915f5774"

// below code to display the top headlines is not tested due to error too many requests, retry !!!
// trying to display top headlines from a reputed newspaper or agency...
const newsSources = "google-news-in"
const currentDate = new Date()
// const currentDateString = currentDate.toISOString() // return a value something like this '2023-09-16T19:59:25.373Z'
const currentDateString = String(currentDate.getFullYear()) + "-"+ String(currentDate.getMonth() + 1) + "-" + String(currentDate.getDate() - 2)
fetch(`https://newsapi.org/v2/top-headlines?from=${currentDateString}&apikey=${apikey}&sources=${newsSources}`)
.then((textData) => textData.json())
.then((jsonData) =>{
    const articles = jsonData.articles
    const headlinesDiv = document.getElementById("topHeadlines")
    try{
        
        for(let i=0;i<articles.length; i++){
            const data = articles[i]
            // creating elements for each headline and its description...

            const newsDiv = document.createElement("div")
            const newsAnchor = document.createElement("a")
            const newsHeading = document.createElement("h2")
            const newsDescription = document.createElement('p')

            // structuring all the elements inside the div
            headlinesDiv.appendChild(newsDiv)
            newsDiv.appendChild(newsAnchor)
            newsAnchor.appendChild(newsHeading)
            newsDiv.appendChild(newsDescription)

            // filling the data to the elements
            newsHeading.textContent = data["title"]
            newsDescription.textContent = data["description"]
            newsAnchor.href = data["url"]
            newsAnchor.target = "_blank"
        }
    } catch(error) {
        console.log(error)
    }
})
.catch((error) =>console.log(error))

// trying to get the input search from the user.
const inputField = document.getElementById("inputField")
const searchButton = document.getElementById("searchButton")
searchButton.addEventListener('click',() =>{
    const subject = inputField.value
    
    // determining the current date when the script is being used...
    const currentDate = new Date()
    // const currentDateString = currentDate.toISOString() // return a value something like this '2023-09-16T19:59:25.373Z'
    const currentDateString = String(currentDate.getFullYear()) + "-"+ String(currentDate.getMonth() + 1) + "-" + String(currentDate.getDate() - 2)

    fetch(`https://newsapi.org/v2/everything?q=${subject}&from=${currentDateString}&sortBy=relevancy&pageSize=10&language=en&apikey=${apikey}`)      
    .then(text_data => text_data.json())
    .then(parsedData => {
        const articles = parsedData.articles;
       
        // console.log(articles)
        try{
            // removing the top-headlines from the page.
            const headlinesDiv = document.getElementById("topHeadlines")
            headlinesDiv.remove()

        }catch(error){
            console.log("error occurred during removing the headlinesDiv")
            console.log(error)
        }
        try{
            // removing any existing newsContainer elements if available
            const newsElements = document.getElementsByClassName("newsContainer")
            for(i in newsElements){
                newsElements[i].remove()
            }
            
        }catch(error){
            console.log("Either removed all newsContainers or an error")
            console.log(error)
        }
        try {
            for(let i = 0;i< 6;i++){
                const data = articles[i];
                // console.log(data)
                const newsContainer = document.createElement("div")
                const anchorElement = document.createElement("a")
                const headingElement = document.createElement("h2")
                const paraElement = document.createElement("p")
                const sourceElement = document.createElement('p')

                // setting class for elements
                newsContainer.classList.toggle("newsContainer")
                sourceElement.classList.toggle("source")

                // code to open each link in new tab
                anchorElement.target = "_blank"
                // structuring the elements in the container
                document.body.appendChild(newsContainer)
                newsContainer.appendChild(anchorElement)
                anchorElement.appendChild(headingElement)
                newsContainer.appendChild(paraElement)
                newsContainer.appendChild(sourceElement)

                // inserting the data to the elements 

                headingElement.textContent = data["title"]
                anchorElement.href = data["url"]
                paraElement.textContent = data["description"]
                sourceElement.textContent = data["source"]["name"]
            }
    }
    catch(error) {
        console.log("Something is wrong...")
        console.log(error)
    }
    })
    .catch(() => {
        const headingElement = document.getElementsByTagName('h2')[0]
        headingElement.textContent = "No News to Display."
    })

})

// code to enable changing between themes...
const body = document.body;
body.classList.toggle("light-theme");

const themeButton = document.getElementById("themeSelector")
themeButton.addEventListener('click', () =>{
    const buttonText = themeButton.value;
    // console.log(buttonText)
    if(buttonText == "darkTheme"){
        themeButton.value = "lightTheme";
        themeButton.textContent = "Light Theme";
        
        body.classList.toggle("dark-theme");
        body.classList.toggle('light-theme');



    }else{
        themeButton.value = "darkTheme";
        themeButton.textContent = "Dark Theme";
        body.classList.toggle('light-theme');
        body.classList.toggle("dark-theme");

    }
})


