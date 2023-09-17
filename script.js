const apikey = "f3ca553ae20249648ac8ef34915f5774"

// !!!!!!!!!!!!!!! change the url by changing the date to current date, and other preferences.....



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
        // const headingElements = document.getElementsByTagName('h2')
        // const paraElements = document.getElementsByTagName('p')
        // const anchorElements = document.getElementsByTagName('a')
       
        console.log(articles)
        try {
            
            for(let i = 0;i< 6;i++){
                const data = articles[i];
                console.log(data)
                const newsContainer = document.createElement("div")
                const anchorElement = document.createElement("a")
                const headingElement = document.createElement("h2")
                const paraElement = document.createElement("p")
                const sourceElement = document.createElement('p')

                // setting class for elements
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
                // console.log(data["source"])


                // console.log(headingElements[i].textContent)
                // headingElements[i].textContent = data["title"];
                // paraElements[i].textContent = data["description"];
                // anchorElements[i].href = data["url"]
            }
    }catch {
        console.log("Something is wrong...")
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
    console.log(buttonText)
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


