export default {
  redirectIfNotAuthed: (directory) => {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      window.location.replace(directory);
    }
  },

  redirectIfAuthed: (directory) => {
    const token = sessionStorage.getItem('userToken');
    if (token) {
      window.location.replace(directory);
    }
  },
};
