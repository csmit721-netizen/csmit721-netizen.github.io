
// Get the form elements.
const form = document.getElementById("introduction-form");
const coursesContainer = document.getElementById("courses-container");
const addCourseButton = document.getElementById("add-course");
const clearButton = document.getElementById("clear-form");
const imageInput = document.getElementById("img");
const imagePreview = document.getElementById("image-preview");
const result = document.getElementById("introduction-result");
const output = document.getElementById("output");
const main = document.querySelector("main");
const pageHeading = main.querySelector("h2");
const instructionHeading = main.querySelector("h3");
const originalTitle = document.title;

const originalCourses = Array.from(
    coursesContainer.querySelectorAll(".course-entry")
).map(function (course) {
    return course.cloneNode(true);
});

const originalImage = imagePreview.getAttribute("src");
let uploadedImage = originalImage;
let courseCounter = originalCourses.length;

// Escape user input before inserting it into generated HTML or XML.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];
    });
}

function escapeXML(value) {
    return escapeHTML(value);
}

// Add a delete button to one course entry.
function addDeleteButton(course) {
    if (course.querySelector(".delete-course")) {
        return;
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Course";
    deleteButton.className = "delete-course";

    deleteButton.addEventListener("click", function () {
        course.remove();
    });

    course.appendChild(deleteButton);
}

// Add delete buttons to all course entries.
function addDeleteButtons() {
    coursesContainer.querySelectorAll(".course-entry").forEach(function (course) {
        addDeleteButton(course);
    });
}

addDeleteButtons();

// Create a blank course entry.
function createCourse() {
    courseCounter++;

    const course = document.createElement("div");
    course.className = "course-entry";

    course.innerHTML = `
        <label for="department${courseCounter}">Department:</label>
        <input type="text" id="department${courseCounter}"
            name="department" placeholder="Department" required>

        <label for="courseNumber${courseCounter}">Course Number:</label>
        <input type="text" id="courseNumber${courseCounter}"
            name="courseNumber" placeholder="Course number" required>

        <label for="courseTitle${courseCounter}">Course Name:</label>
        <input type="text" id="courseTitle${courseCounter}"
            name="courseTitle" placeholder="Course name" required>

        <label for="reasonForTaking${courseCounter}">Reason for Taking:</label>
        <textarea id="reasonForTaking${courseCounter}"
            name="reasonForTaking"
            placeholder="Why are you taking this course?" required></textarea>
    `;

    addDeleteButton(course);
    return course;
}

// Add another course entry.
addCourseButton.addEventListener("click", function () {
    coursesContainer.appendChild(createCourse());
});

// Preview an uploaded image.
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    if (!file) {
        uploadedImage = originalImage;
        imagePreview.src = originalImage;
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        imageInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        uploadedImage = reader.result;
        imagePreview.src = uploadedImage;
    };

    reader.readAsDataURL(file);
});

// Collect the current information from the form.
function collectIntroductionData() {
    const firstName = form.elements.firstName.value.trim();
    const middleName = form.elements.middleName.value.trim();
    const nickname = form.elements.nickname.value.trim();
    const lastName = form.elements.lastName.value.trim();

    const acknowledgment = form.elements.acknowledgment.value.trim();
    const acknowledgmentDate = form.elements.acknowledgmentDate.value;
    const adjective = form.elements.adjectives.value.trim();
    const animal = form.elements.animal.value.trim();
    const divider = form.elements.prettyNameDivider.value.trim();

    const pictureAlt = form.elements.pictureAlt.value.trim();
    const caption = form.elements.caption.value.trim();

    const personalStatement = form.elements.personalStatement.value.trim();
    const personalBackground = form.elements.personalBackground.value.trim();
    const professionalBackground = form.elements.professionalBackground.value.trim();
    const academicBackground = form.elements.academicBackground.value.trim();
    const primaryWorkComputer = form.elements.primaryWorkComputer.value.trim();
    const primaryWorkLocation = form.elements.primaryWorkLocation.value.trim();
    const alternateComputerLocation = form.elements.alternateComputerLocation.value.trim();

    const quote = form.elements.quote.value.trim();
    const quoteAuthor = form.elements.quoteAuthor.value.trim();
    const funnyItem = form.elements.funnyItem.value.trim();
    const somethingToShare = form.elements.somethingToShare.value.trim();

    // Collect all current courses.
    const courses = Array.from(
        coursesContainer.querySelectorAll(".course-entry")
    ).map(function (course) {
        return {
            department: course.querySelector('[name="department"]').value.trim(),
            number: course.querySelector('[name="courseNumber"]').value.trim(),
            title: course.querySelector('[name="courseTitle"]').value.trim(),
            reason: course.querySelector('[name="reasonForTaking"]').value.trim()
        };
    });

    // Keep all six website links in their original order.
    const linkLabels = [
        "CLT Web",
        "GitHub.io",
        "GitHub",
        "freeCodeCamp",
        "Codecademy",
        "LinkedIn"
    ];

    const links = [];

    for (let i = 1; i <= 6; i++) {
        const url = form.elements["link" + i].value.trim();

        if (url) {
            links.push({
                label: linkLabels[i - 1],
                url: url
            });
        }
    }

    const fullName = [firstName, middleName, lastName]
        .filter(Boolean)
        .join(" ");

    const preferredName = nickname
        ? `${fullName} (${nickname})`
        : fullName;

    const dateParts = acknowledgmentDate.split("-");
    const formattedDate = `${Number(dateParts[1])}/${Number(dateParts[2])}/${dateParts[0]}`;

    return {
        firstName: firstName,
        middleName: middleName,
        nickname: nickname,
        lastName: lastName,
        heading: `${preferredName}: Introduction Form`,
        acknowledgment: acknowledgment,
        acknowledgmentDate: formattedDate,
        adjective: adjective,
        animal: animal,
        divider: divider,
        mascot: `${fullName} ${divider} ${adjective} ${animal}`,
        picture: uploadedImage,
        pictureAlt: pictureAlt,
        caption: caption,
        personalStatement: personalStatement,
        personalBackground: personalBackground,
        professionalBackground: professionalBackground,
        academicBackground: academicBackground,
        primaryWorkComputer: primaryWorkComputer,
        primaryWorkLocation: primaryWorkLocation,
        alternateComputerLocation: alternateComputerLocation,
        courses: courses,
        quote: quote,
        quoteAuthor: quoteAuthor,
        funnyItem: funnyItem,
        somethingToShare: somethingToShare,
        links: links
    };
}

// Build the HTML version of the introduction.
function createHTMLDocument(data) {
    const courseHTML = data.courses.map(function (course) {
        return `<li><strong>${escapeHTML(course.department)} ${escapeHTML(course.number)} - ${escapeHTML(course.title)}: </strong>${escapeHTML(course.reason)}</li>`;
    }).join("\n            ");

    const linksHTML = data.links.map(function (link) {
        return `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)}</a>`;
    }).join(" || ");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(data.heading)}</title>
    <link rel="stylesheet" href="styles/default.css">
</head>
<body>
    <main>
        <h2>${escapeHTML(data.heading)}</h2>
        <p class="centered">${escapeHTML(data.acknowledgment)} - CS ${escapeHTML(data.acknowledgmentDate)}</p>
        <h3>${escapeHTML(data.mascot)}</h3>
        <figure>
            <img src="${escapeHTML(data.picture)}" alt="${escapeHTML(data.pictureAlt)}">
            <figcaption>${escapeHTML(data.caption)}</figcaption>
        </figure>
        <p>${escapeHTML(data.personalStatement)}</p>
        <ul>
            <li><strong>Personal Background:</strong> ${escapeHTML(data.personalBackground)}</li>
            <li><strong>Professional Background:</strong> ${escapeHTML(data.professionalBackground)}</li>
            <li><strong>Academic Background:</strong> ${escapeHTML(data.academicBackground)}</li>
            <li><strong>Primary Work Computer:</strong> ${escapeHTML(data.primaryWorkComputer)}</li>
            <li><strong>Primary Work Location:</strong> ${escapeHTML(data.primaryWorkLocation)}</li>
            <li><strong>Alternate Computer &amp; Location:</strong> ${escapeHTML(data.alternateComputerLocation)}</li>
            <li><strong>Courses I'm Taking, &amp; Why:</strong>
                <ol>
                    ${courseHTML}
                </ol>
            </li>
        </ul>
        <blockquote>
            <p>${escapeHTML(data.quote)}</p>
            <p><em>- ${escapeHTML(data.quoteAuthor)}</em></p>
        </blockquote>
        ${data.funnyItem ? `<p><strong>Funny Thing:</strong> ${escapeHTML(data.funnyItem)}</p>` : ""}
        ${data.somethingToShare ? `<p><strong>Something I Would Like to Share:</strong> ${escapeHTML(data.somethingToShare)}</p>` : ""}
        <p class="centered">${linksHTML}</p>
    </main>
</body>
</html>`;
}

// Build the XML version of the introduction.
function createXMLDocument(data) {
    const courseXML = data.courses.map(function (course) {
        return `
        <course>
            <department>${escapeXML(course.department)}</department>
            <number>${escapeXML(course.number)}</number>
            <title>${escapeXML(course.title)}</title>
            <reason>${escapeXML(course.reason)}</reason>
        </course>`;
    }).join("");

    const linkXML = data.links.map(function (link) {
        return `
        <link>
            <label>${escapeXML(link.label)}</label>
            <url>${escapeXML(link.url)}</url>
        </link>`;
    }).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<introduction>
    <firstName>${escapeXML(data.firstName)}</firstName>
    <middleName>${escapeXML(data.middleName)}</middleName>
    <nickname>${escapeXML(data.nickname)}</nickname>
    <lastName>${escapeXML(data.lastName)}</lastName>
    <heading>${escapeXML(data.heading)}</heading>
    <acknowledgment>${escapeXML(data.acknowledgment)}</acknowledgment>
    <acknowledgmentDate>${escapeXML(data.acknowledgmentDate)}</acknowledgmentDate>
    <adjective>${escapeXML(data.adjective)}</adjective>
    <animal>${escapeXML(data.animal)}</animal>
    <divider>${escapeXML(data.divider)}</divider>
    <mascot>${escapeXML(data.mascot)}</mascot>
    <picture>${escapeXML(data.picture)}</picture>
    <pictureAlt>${escapeXML(data.pictureAlt)}</pictureAlt>
    <caption>${escapeXML(data.caption)}</caption>
    <personalStatement>${escapeXML(data.personalStatement)}</personalStatement>
    <personalBackground>${escapeXML(data.personalBackground)}</personalBackground>
    <professionalBackground>${escapeXML(data.professionalBackground)}</professionalBackground>
    <academicBackground>${escapeXML(data.academicBackground)}</academicBackground>
    <primaryWorkComputer>${escapeXML(data.primaryWorkComputer)}</primaryWorkComputer>
    <primaryWorkLocation>${escapeXML(data.primaryWorkLocation)}</primaryWorkLocation>
    <alternateComputerLocation>${escapeXML(data.alternateComputerLocation)}</alternateComputerLocation>
    <courses>${courseXML}
    </courses>
    <quote>${escapeXML(data.quote)}</quote>
    <quoteAuthor>${escapeXML(data.quoteAuthor)}</quoteAuthor>
    <funnyItem>${escapeXML(data.funnyItem)}</funnyItem>
    <somethingToShare>${escapeXML(data.somethingToShare)}</somethingToShare>
    <links>${linkXML}
    </links>
</introduction>`;
}

// Display generated code in a text area at the bottom of the page.
function displayGeneratedCode(type, code) {
    const outputId = `generated-${type}-output`;
    let textarea = document.getElementById(outputId);

    if (!textarea) {
        const section = document.createElement("section");
        section.className = "generated-output";

        const heading = document.createElement("h3");
        heading.textContent = `Generated ${type.toUpperCase()}`;

        const label = document.createElement("label");
        label.htmlFor = outputId;
        label.textContent = `${type.toUpperCase()} Source Code:`;

        textarea = document.createElement("textarea");
        textarea.id = outputId;
        textarea.readOnly = true;
        textarea.rows = 20;
        textarea.spellcheck = false;
        textarea.setAttribute("aria-label", `Generated ${type.toUpperCase()} source code`);

        section.appendChild(heading);
        section.appendChild(label);
        section.appendChild(textarea);
        output.appendChild(section);
    }

    // Update the existing text area instead of creating duplicates.
    textarea.value = code;
}

// Generate HTML when its button is clicked.
document.getElementById("gen-html").addEventListener("click", function () {
    if (!form.reportValidity()) {
        return;
    }

    const data = collectIntroductionData();
    const htmlCode = createHTMLDocument(data);

    displayGeneratedCode("html", htmlCode);
});

// Generate JSON when its button is clicked.
document.getElementById("gen-json").addEventListener("click", function () {
    if (!form.reportValidity()) {
        return;
    }

    const data = collectIntroductionData();
    const jsonCode = JSON.stringify(data, null, 4);

    displayGeneratedCode("json", jsonCode);
});

// Generate XML when its button is clicked.
document.getElementById("gen-xml").addEventListener("click", function () {
    if (!form.reportValidity()) {
        return;
    }

    const data = collectIntroductionData();
    const xmlCode = createXMLDocument(data);

    displayGeneratedCode("xml", xmlCode);
});

// Clear all fields while keeping one blank course entry.
clearButton.addEventListener("click", function () {
    form.querySelectorAll("input, textarea").forEach(function (field) {
        if (
            field.type !== "file" &&
            field.type !== "button" &&
            field.type !== "submit" &&
            field.type !== "reset"
        ) {
            field.value = "";
        }
    });

    imageInput.value = "";
    uploadedImage = originalImage;
    imagePreview.src = originalImage;

    coursesContainer.innerHTML = "";
    coursesContainer.appendChild(createCourse());

    output.innerHTML = "";
    output.hidden = false;
});

// Restore the original form after Reset is clicked.
form.addEventListener("reset", function () {
    setTimeout(function () {
        coursesContainer.innerHTML = "";

        originalCourses.forEach(function (course) {
            coursesContainer.appendChild(course.cloneNode(true));
        });

        addDeleteButtons();

        imageInput.value = "";
        uploadedImage = originalImage;
        imagePreview.src = originalImage;

        output.innerHTML = "";

        result.hidden = true;
        form.hidden = false;
        pageHeading.hidden = false;
        instructionHeading.hidden = false;

        document.title = originalTitle;
    }, 0);
});

// Submit the form and generate the introduction page.
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    const data = collectIntroductionData();

    const courseHTML = data.courses.map(function (course) {
        return `<li><strong>${escapeHTML(course.department)} ${escapeHTML(course.number)} - ${escapeHTML(course.title)}: </strong>${escapeHTML(course.reason)}</li>`;
    }).join("");

    const linksHTML = data.links.map(function (link) {
        return `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)}</a>`;
    }).join(" || ");

    result.innerHTML = `
        <h2>${escapeHTML(data.heading)}</h2>

        <p class="centered">
            ${escapeHTML(data.acknowledgment)} - CS ${escapeHTML(data.acknowledgmentDate)}
        </p>

        <h3>${escapeHTML(data.mascot)}</h3>

        <figure>
            <img src="${escapeHTML(data.picture)}" alt="${escapeHTML(data.pictureAlt)}">
            <figcaption><em>${escapeHTML(data.caption)}</em></figcaption>
        </figure>

        <p>${escapeHTML(data.personalStatement)}</p>

        <ul>
            <li><strong>Personal Background:</strong> ${escapeHTML(data.personalBackground)}</li>
            <li><strong>Professional Background:</strong> ${escapeHTML(data.professionalBackground)}</li>
            <li><strong>Academic Background:</strong> ${escapeHTML(data.academicBackground)}</li>
            <li><strong>Primary Work Computer:</strong> ${escapeHTML(data.primaryWorkComputer)}</li>
            <li><strong>Primary Work Location:</strong> ${escapeHTML(data.primaryWorkLocation)}</li>
            <li><strong>Alternate Computer &amp; Location:</strong> ${escapeHTML(data.alternateComputerLocation)}</li>
            <li><strong>Courses I'm Taking, &amp; Why:</strong>
                <ol>${courseHTML}</ol>
            </li>
        </ul>

        <blockquote>
            <p>${escapeHTML(data.quote)}</p>
            <p><em>- ${escapeHTML(data.quoteAuthor)}</em></p>
        </blockquote>

        ${data.funnyItem ? `<p><strong>Funny Thing:</strong> ${escapeHTML(data.funnyItem)}</p>` : ""}

        ${data.somethingToShare ? `<p><strong>Something I Would Like to Share:</strong> ${escapeHTML(data.somethingToShare)}</p>` : ""}

        <p class="centered">${linksHTML}</p>

        <div class="form-buttons">
            <button type="button" id="reset-progress">Reset Form</button>
        </div>
    `;

    form.hidden = true;
    output.hidden = true;
    pageHeading.hidden = true;
    instructionHeading.hidden = true;
    result.hidden = false;

    document.title = `Christa Smith's Crazy Snake | ITIS3135 | ${data.heading}`;

    document.getElementById("reset-progress").addEventListener("click", function () {
        form.reset();
        window.scrollTo(0, 0);
    });
});