export function validate_url(url: string) {
	// check if url is valid
	return url.match(
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)/,
	)
}
