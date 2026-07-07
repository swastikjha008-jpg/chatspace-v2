const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion

export function generateRoomId(length = 6): string {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return id;
}
