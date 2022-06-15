/** Склонение существительных
 * Использование:
 *   declOfNum(10, ["яблоко", "яблока", "яблок"])
 *                     1         2         5
 */
export default function declOfNum(n, titles) {
  n = +n
  return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}
