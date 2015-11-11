export default class StorageUtil {
	static cleanSession() {
		localStorage.removeItem("did");
      	localStorage.removeItem("token");
	}
}
