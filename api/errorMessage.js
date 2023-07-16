const errorMessage = (status, message, err) => {
    const error = new Error()
    const originalErr = err?.message
    error.status = status
    error.message=message + "\n錯誤詳細描述:" + originalErr
    return error
}

export default errorMessage