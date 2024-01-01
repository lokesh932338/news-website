const apikey = "f3ca553ae20249648ac8ef34915f5774"

// calling the starter function in the starting
starter()

function starter(){
    // trying to display top headlines from a reputed newspaper or agency...
    const newsSources = "google-news-in"
    const currentDate = new Date()
    // const currentDateString = currentDate.toISOString() // return a value something like this '2023-09-16T19:59:25.373Z'
    const currentDateString = String(currentDate.getFullYear()) + "-"+ String(currentDate.getMonth() + 1) + "-" + String(currentDate.getDate() - 2)

    const url = `https://newsapi.org/v2/top-headlines?from=${currentDateString}&apikey=${apikey}&sources=${newsSources}`

    headingText = "Top Headlines from Google News"

    createPage(url,headingText)
}

// trying to display top headlines from a reputed newspaper or agency...
const newsSources = "google-news-in"
const currentDate = new Date()
// const currentDateString = currentDate.toISOString() // return a value something like this '2023-09-16T19:59:25.373Z'
const currentDateString = String(currentDate.getFullYear()) + "-"+ String(currentDate.getMonth() + 1) + "-" + String(currentDate.getDate() - 2)
fetch(`https://newsapi.org/v2/top-headlines?from=${currentDateString}&apikey=${apikey}&sources=${newsSources}`)
.then((textData) => {
    console.log(textData);
    return textData.json()
})
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

// function for handling the search action

await function search() {
    const subject = inputField.value
    
    // determining the current date when the script is being used...
    const currentDate = new Date()
    // const currentDateString = currentDate.toISOString() // return a value something like this '2023-09-16T19:59:25.373Z'
    const currentDateString = String(currentDate.getFullYear()) + "-"+ String(currentDate.getMonth() + 1) + "-" + String(currentDate.getDate() - 2)

    const url = `https://newsapi.org/v2/everything?q=${subject}&from=${currentDateString}&sortBy=relevancy&pageSize=10&language=en&apikey=${apikey}`

    
    headingText = `NEWS results for ${subject}`
    const news_articles = await getData(url,headingText)
    createPage(news_articles)

}

async function getData(url, headingText = ""){
    const text_data = await fetch(url)      
    const parsed_data = await text_data.json()
    const news_articles = parsedData.articles;
    return news_articles
}

function createPage(articles){

    
       
        // console.log(articles)
        const allNewsContainer = document.getElementById("allNewsContainer")
        try {
            // trying to remove all existing children from allNewsContainer
            const newsChildrenObj = allNewsContainer.children  //returns an object not normal, a DOM
            const childrenCount = newsChildrenObj.length
            for(let i = 0;i < childrenCount; i++){
                newsChildrenObj[0].remove()
            }
           
            
        } catch(error){
            console.log("error occurred while removing children from allNewsContainer")
            console.log(error)
        }
        

        const topHeading = document.createElement('h2')
        topHeading.id = "topHeading"
        topHeading.textContent = headingText
        allNewsContainer.appendChild(topHeading)

        try {
            for(let i = 0;i < 10;i++){
                const data = articles[i];
                // console.log(data)
                if(data["content"] == "[Removed]"){
                    console.log("found removed news result.");
                    continue;
                }
                
                const newsContainer = document.createElement("div")
                // const newsrow = document.createElement("tr")
                const anchorElement = document.createElement("a")
                const headingElement = document.createElement("h2")
                const paraElement = document.createElement("p")
                const sourceElement = document.createElement('p')
                const imgdiv = document.createElement('div')
                const imgElement = document.createElement('img')
                const hdContainer = document.createElement('div') // container for heading and description

                // setting class for elements
                newsContainer.classList.toggle("newsContainer")
                sourceElement.classList.toggle("source")
                imgdiv.classList.toggle("imgdiv")
                imgElement.classList.toggle("newsImg")
                hdContainer.classList.toggle("hdContainer")

                // giving id's to newsContainer
                newsContainer.id = `newsContainer${i}`

                // code to open each link in new tab
                anchorElement.target = "_blank"
                // structuring the elements in the container
                allNewsContainer.appendChild(newsContainer)
                newsContainer.appendChild(hdContainer)
                newsContainer.appendChild(imgdiv)
                

                imgdiv.appendChild(imgElement)
                hdContainer.appendChild(anchorElement)
                anchorElement.appendChild(headingElement)
                hdContainer.appendChild(paraElement)
                hdContainer.appendChild(sourceElement)

                // inserting the data to the elements 
                if(data["urlToImage"] != null){
                    imgElement.src = data["urlToImage"]
                } else {
                    imgdiv.remove()
                }

                // imgElement.src = data["urlToImage"]
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

}

searchButton.addEventListener('click',search)
inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.keyCode === 13){
        search()
    }
})

// code to enable changing between themes...
const body = document.body;
body.classList.toggle("light-theme");

const themeButton = document.getElementById("themeSelector")
themeButton.addEventListener('click', () =>{
    const buttonText = themeButton.value;

    // changing the github logo image in contactDev...
    const githubImage = document.getElementById("githubImage")
    // console.log(buttonText)
    if(buttonText == "darkTheme"){
        themeButton.value = "lightTheme";
        themeButton.textContent = "Light Theme";

        githubImage.src = "./images/GitHub_Logo_White.png"
        body.classList.toggle("dark-theme");
        body.classList.toggle('light-theme');




    }else{
        themeButton.value = "darkTheme";
        themeButton.textContent = "Dark Theme";

        githubImage.src = "./images/GitHub_Logo.png"
        body.classList.toggle('light-theme');
        body.classList.toggle("dark-theme");

    }
})


