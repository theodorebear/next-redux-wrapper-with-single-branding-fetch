import axios from "axios"

const urls = {
	front_init: "/handlers/front/init",
	page_get: "/handlers/front/page-get",
}
export function _brandingGet(vals) {
	return axios.post(urls.front_init, vals)
}
export function _pageGet(vals) {
	return axios.post(urls.page_get, vals)
}