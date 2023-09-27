const userChecker = (response) => {
    if (response?.length < 0) {
        return false;
    }

    return true
}

module.exports = { userChecker }