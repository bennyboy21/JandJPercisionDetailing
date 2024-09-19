function loaded() {
    const loaderElement = document.getElementById("loader")
    const pageElement = document.getElementById("whole-Page")
    const projectNumbers = document.querySelectorAll('.project-Number');

    projectNumbers.forEach((element, index) => {
        element.innerText = "#" + (index + 1)
    });

    
    changeSelectedImage("r", false)
    changeSelectedImage("l", false)

    loaderElement.style.transition = ".5s"
    loaderElement.style.opacity = "0"
    setTimeout(function() {
        loaderElement.style.display = "none"
        pageElement.style.display = "flex"
        setTimeout(function() {
            pageElement.style.transition = ".5s"
            pageElement.style.opacity = "1"
            setTimeout(function() {
                pageElement.style.transition = "0s"
                loaderElement.style.transition = "0s"
            }, 500)
        }, 100) 
    }, 500)
    topBarColorChange()
    topBarColorChange2()
    
    const containers = document.querySelectorAll('.third-Section-Image-Container');

    containers.forEach((container) => {
        container.style.transition = "transform 1s ease"
    })

    setInterval(function() {
        if(recentlyUsed == false) {
            counter += 1
        } else {
            counter = 0
            recentlyUsed = false
        }
    }, 1000)

    setInterval(function() {
        if(counter > 60) {
            changeSelectedImage("r", false)
        }
    }, 15000)
}

setInterval(function() {
    var num = 0
    if(window.screen.width < 500) {
        num = -80
    } else {
        num = -75
    }

    nextWord.innerText = words[i]
    currentWord.style.transition = ".5s"
    currentWord.style.marginTop = num + "px"
    setTimeout(function() {
        currentWord.innerText = words[i]
        currentWord.style.transition = "0s"
        currentWord.style.marginTop = "0px"
        
        i += 1

        if(i == words.length) {
            i = 0
        }
    }, 500)
    
}, 2500)


function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();

    // Check if the element is within the viewport
    const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    return !isVisible; // Return true if the element is scrolled away (not in the viewport)
}

function isElementInViewport2(element) {
    const rect = element.getBoundingClientRect();

    // Check if any part of the element is within the viewport
    const isVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

    return isVisible; // Return true if any part of the element is in the viewport
}

function scrollToElement(selector) {
    const element = document.querySelector(selector);
    bookNowButton()
    
    if (element) {
        if (selector === "#second-Section") {
            // Get the element's position relative to the top of the document
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            // Scroll instantly to 200px past the element's position
            window.scrollTo({
                top: elementPosition + 150, // Scroll 200px past the element
                behavior: 'smooth' // No smooth scroll for immediate effect
            });
        } else if (selector === "#forth-Section") {
            // Get the element's position relative to the top of the document
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            // Scroll instantly to 200px past the element's position
            window.scrollTo({
                top: elementPosition - 125, // Scroll 200px past the element
                behavior: 'smooth' // No smooth scroll for immediate effect
            });
        } else {
            // For other elements, just scroll to them normally
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }
}

function changeSelectedImage(direction, user) {
    
    const containers = document.querySelectorAll('.third-Section-Image-Container');
    const videoContainers = document.querySelectorAll('.third-Section-Example-Content-Container');
    const videos = document.querySelectorAll('.thrid-Section-Example-Video');
    
    // Update the currentImageIndex based on the direction
    if (direction === "r") {
        currentImageIndex = (currentImageIndex + 1) % containers.length; // Move right, loop back
    } else if (direction === "l") {
        currentImageIndex = (currentImageIndex - 1 + containers.length) % containers.length; // Move left, loop to last
    }

    // Loop through the images and apply rotation, translation, and scaling
    containers.forEach((container, index) => {
        const distanceFromCurrent = index - currentImageIndex;

        if (distanceFromCurrent === 0) {
            container.style.transition = `.5s`; 
            container.style.transform = `rotate(0deg) translate(-50%)`; 
            container.style.scale = `1`; 
            container.style.zIndex = `105`;
            container.style.opacity = `1`;
            videoContainers[index].style.boxShadow = "0px 5px 15px 2px rgba(0, 0, 0, 0.75)"
            videos[index].play()
        } else if (distanceFromCurrent < 0) {
            var degressToRotate = (distanceFromCurrent * 7)
            var scaleToChange = 1 - ((distanceFromCurrent * -1) / 20)
            container.style.transition = `.5s`; 
            container.style.opacity = `0.5`;
            container.style.transform = `rotate(${degressToRotate}deg) translate(-50%)`; 
            container.style.scale = `${scaleToChange}`; 
            container.style.zIndex = `${containers.length - index}`;
            videos[index].pause()
        } else {
            var degressToRotate = (distanceFromCurrent * 7)
            var scaleToChange = 1 - ((distanceFromCurrent * -1) / 20)
            container.style.transition = `.5s`; 
            container.style.opacity = `0.5`;
            container.style.transform = `rotate(${degressToRotate}deg) translate(-50%)`; 
            container.style.scale = `${scaleToChange}`; 
            container.style.zIndex = `${(index) - (distanceFromCurrent * -1)}`;
            videos[index].pause()
        }
    });

    if(user) {
        recentlyUsed = true
    } else {
        recentlyUsed = false
    }
}

function topBarColorChange() {
    const element = document.getElementById('view-Element');
    const topBarElement = document.getElementById("top-Bar")
    const options = document.querySelectorAll('.option')
    const logo = document.getElementById("logo-Img")
    const bookNowButton2 = document.getElementById("book-Now-Button-2")
    
    if (isElementInViewport(element) && this.window.scrollY > 600) {
        topBarElement.style.transition = ".25s"
        topBarElement.style.background = "var(--white-color)"
        topBarElement.style.borderBottom = " 1px solid var(--grey-color)"

        bookNowButton2.style.transition = ".25s"
        bookNowButton2.style.background = "var(--black-color)"
        bookNowButton2.style.color = "var(--white-color)"
        
        options.forEach(option => {
            option.style.transition = '.25s';
            option.style.color = 'var(--black-color)';
        });

        logo.style.transition = ".25s"
        logo.style.filter = "brightness(0%)"

        setTimeout(function() {
            bookNowButton2.style.transition = "0s"
            topBarElement.style.transition = "0s"
            options.forEach(option => {
                option.style.transition = '0s';
            });
            logo.style.transition = "0s"
        })
    } else {
        topBarElement.style.transition = ".25s"
        topBarElement.style.background = "var(--black-color)"
        topBarElement.style.borderBottom = " 1px solid var(--dark-grey)"

        bookNowButton2.style.transition = ".25s"
        bookNowButton2.style.background = "var(--white-color)"
        bookNowButton2.style.color = "var(--black-color)"
        
        options.forEach(option => {
            option.style.transition = '.25s';
            option.style.color = 'var(--white-color)';
        });

        logo.style.transition = ".25s"
        logo.style.filter = "brightness(100%)"

        setTimeout(function() {
            topBarElement.style.transition = "0s"
            options.forEach(option => {
                option.style.transition = '0s';
            });
            logo.style.transition = "0s"
        })
    }
}

function topBarColorChange2() {
    const element = document.getElementById("view-Element-2")
    const topBarElement = document.getElementById("top-Bar")
    const options = document.querySelectorAll('.option')
    const logo = document.getElementById("logo-Img")
    const bookNowButton2 = document.getElementById("book-Now-Button-2")
    
    if (!isElementInViewport2(element) && this.window.scrollY > 2100) {
        topBarElement.style.transition = ".25s"
        topBarElement.style.background = "var(--black-color)"
        topBarElement.style.borderBottom = " 1px solid var(--dark-grey)"

        bookNowButton2.style.transition = ".25s"
        bookNowButton2.style.background = "var(--white-color)"
        bookNowButton2.style.color = "var(--black-color)"
        
        options.forEach(option => {
            option.style.transition = '.25s';
            option.style.color = 'var(--white-color)';
        });

        logo.style.transition = ".25s"
        logo.style.filter = "brightness(100%)"

        setTimeout(function() {
            bookNowButton2.style.transition = "0s"
            topBarElement.style.transition = "0s"
            options.forEach(option => {
                option.style.transition = '0s';
            });
            logo.style.transition = "0s"
        })
    }
}

function bookNowButton() {
    const bookNowButton = document.getElementById("book-Now")
    const bookNowButton2 = document.getElementById("book-Now-Button-2")
    // console.log(window.scrollY)
    console.log("Show Button: " + String(isElementInViewport(bookNowButton) && this.window.scrollY > 300))
    console.log("Hide Button: " + String(!isElementInViewport(bookNowButton) && window.scrollY > 600))
    
    if(isElementInViewport(bookNowButton) && this.window.scrollY > 300) {
        bookNowButton2.removeAttribute("disabled")
        bookNowButton2.style.transition = ".25s"
        bookNowButton2.style.opacity = "1"
        setTimeout(function() {
            bookNowButton2.style.transition = "0s"
        }, 250)
    } else if(!isElementInViewport(bookNowButton) && window.scrollY < 600){
        bookNowButton2.setAttribute("disabled", "")
        bookNowButton2.style.transition = ".25s"
        bookNowButton2.style.opacity = "0"
        setTimeout(function() {
            bookNowButton2.style.transition = "0s"
        }, 250)
    }
}

function isVideoOnScreen() {
    var element = document.querySelectorAll(".thrid-Section-Example-Video")
    if(isElementInViewport2(element[currentImageIndex])) {
        element[currentImageIndex].play()
    } else {
        element[currentImageIndex].pause()
    }
}

function sendEmail(event) {
    
    event.preventDefault();

    if(loadingCurrently == false) {
        loadingCurrently = true
        var firstName = document.getElementById("first-Name").value
        var lastName = document.getElementById("last-Name").value
        var name = firstName + " " + lastName
        var email = document.getElementById("email-Text-Box").value
        var phoneNumber = document.getElementById("phone-Number-Text-Box").value
        var message = document.getElementById("message-Text-Box").value
        var text = "Sent!"

        console.log({name, email, message, phoneNumber})
        const buttonText = document.getElementById("button-Send-Text")
        const loaderElement = document.querySelector(".loader-2")
        const textElement = document.querySelector("#failed-Sent-Text")

        fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'api-key': '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'
            },
            body: JSON.stringify({
            sender: { email: 'benburnell2007@gmail.com', name: 'Your Website' }, // Use the email you verified with Brevo
            to: [{ email: 'benburnell2007@gmail.com', name: 'Ben Burnell' }], // Your receiving email
            subject: `New Message from ${name}`,
            htmlContent: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone #:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong><br>${message}</p>
            `,
            })
        }).then(response => response.json())
        .then(data => text = "Sent!")
        .catch(error => text = "Failed!");

        buttonText.style.opacity = "0"
        setTimeout(function() {
            loaderElement.style.opacity = "1"
            setTimeout(function() {
                loaderElement.style.opacity = "0"
                textElement.innerText = text
                textElement.style.opacity = "1"

                setTimeout(function() {
                    textElement.style.opacity = "0"
                    setTimeout(function() {
                        if(text == "Sent!") {
                            document.getElementById("first-Name").value = ""
                            lastName = document.getElementById("last-Name").value = ""
                            email = document.getElementById("email-Text-Box").value = ""
                            phoneNumber = document.getElementById("phone-Number-Text-Box").value = ""
                            message = document.getElementById("message-Text-Box").value = ""
                            buttonText.style.opacity = "1"
                            loadingCurrently = false
                            checkSendVerification()
                        } else {
                            buttonText.style.opacity = "1"
                            loadingCurrently = false
                            checkSendVerification()
                        }
                    }, 500)
                }, 2500)
            }, 1000)
        }, 500)
    }
}

function removeSpaces(str) {
    return str.replace(/\s+/g, ''); // Replace all whitespace characters with an empty string
}

function checkSendVerification() {
    var firstName = document.getElementById("first-Name").value
    var lastName = document.getElementById("last-Name").value
    var email = document.getElementById("email-Text-Box").value
    var phoneNumber = document.getElementById("phone-Number-Text-Box").value
    var message = document.getElementById("message-Text-Box").value

    if(removeSpaces(firstName) != "" && removeSpaces(lastName) != "" && removeSpaces(email) != "" && removeSpaces(phoneNumber) != "" && removeSpaces(message) != "") {
        document.getElementById("send-Message-Button").classList.add("usable")
        document.getElementById("send-Message-Button").removeAttribute("disabled")
    } else {
        document.getElementById("send-Message-Button").classList.remove("usable")
        document.getElementById("send-Message-Button").setAttribute("disabled", "")
    }
}



// Main
const currentWord = document.getElementById("current-Word")
const nextWord = document.getElementById("next-Word")
var i = 1
var currentImageIndex = 0
const words = ["Shine", "Sparkle", "Glow", "Stand out"]
currentWord.innerText = words[0]
var recentlyUsed = false
var counter = 0
var loadingCurrently = false
var buttonCurrentChanging = false

window.addEventListener('scroll', function() {
    topBarColorChange() 
    topBarColorChange2()
    isVideoOnScreen()
    bookNowButton()
});

const sendSMS = async () => {
    const response = await fetch('https://api.brevo.com/v3/transactionalSMS/sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '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' // Replace with your actual API key
        },
        body: JSON.stringify({
            sender: 'piyush', // Sender name or number
            recipient: '+14372675988', // Recipient's phone number with country code
            content: 'Hello! This is a test message from Brevo SMS.', // SMS content
            type: 'transactional' // Transactional SMS
        })
    });
  
    const result = await response.json();
    console.log(result);
};
  
// Call the sendSMS function to send the SMS
// sendSMS();

"Unable to send sms. Your SMS sending status is not yet activated. Please contact us at contact@sendinblue.com to request activation."
  