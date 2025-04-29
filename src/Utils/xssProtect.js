function xssProtect(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

export default xssProtect;