// 0 is room
// 1 is path
// 2 is wall blocks
// 3 is room entrance
// 4 is door so that entrace cell is visible
// 5 is square empty rooms
// 6 is long rectange empty rooms
// 7 is small square empty rooms
export const board = [
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0],
  [1, 1, 4, 1, 2, 2, 5, 2, 1, 1, 4, 1, 1, 2, 2, 5, 2, 1, 1, 1, 4, 1, 2, 2, 5, 2, 1, 1, 4, 1],
  [2, 2, 6, 1, 1, 1, 1, 4, 1, 2, 2, 6, 1, 1, 1, 1, 1, 1, 2, 2, 6, 1, 1, 1, 4, 1, 1, 2, 2, 6],
  [2, 2, 2, 1, 0, 0, 0, 3, 0, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 2, 2, 0, 0, 0, 3, 0, 1, 2, 2, 2],
  [2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 2, 2, 2],
  [2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 2, 2, 2],
  [2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2],
  [1, 1, 4, 1, 2, 2, 5, 2, 1, 1, 4, 1, 1, 2, 2, 5, 2, 1, 1, 1, 4, 1, 2, 2, 5, 2, 1, 1, 4, 1],
  [0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0],
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0]
];

export const roomData = [
  { id: 0, img: '/images/reactJs_logo.png', route: '/labs/reactJs', x: 3, y: 2 },
  { id: 1, img: '/images/cpp_logo.png', route: '/labs/c++', x: 3, y: 10 },
  { id: 2, img: '/images/angular_logo.png', route: '/labs/angular', x: 3, y: 20 },
  { id: 3, img: '/images/tailwindCss_logo.png', route: '/labs/tailwindCSS', x: 3, y: 28 },
  { id: 4, img: '/images/graphql_logo.png', route: '/labs/graphql', x: 4, y: 7 },
  { id: 5, img: '/images/nodeJs_logo.png', route: '/labs/nodeJs', x: 4, y: 24 },
  { id: 6, img: '/images/tensorFlow_logo.jpg', route: '/labs/tensorFlow', x: 9, y: 2 },
  { id: 7, img: '/images/html_logo.jpg', route: '/labs/html', x: 9, y: 10 },
  { id: 8, img: '/images/python_logo.png', route: '/labs/python', x: 9, y: 20 },
  { id: 9, img: '/images/php_logo.png', route: '/labs/php', x: 9, y: 28 }
];
