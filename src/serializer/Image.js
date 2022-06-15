export default function Image(el = {}) {
  return {
    id: el.id || Math.floor(Math.random() * 1000),
    url: el.url || require('src/assets/img/icon/no-photo.svg').default,
    main: el.is_main || false
  }
}
