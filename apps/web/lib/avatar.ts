const PALETTE = [
  { bg: 'bg-plasma-purple/20', text: 'text-plasma-purple', ring: 'ring-plasma-purple/40' },
  { bg: 'bg-plasma-cyan/20', text: 'text-plasma-cyan', ring: 'ring-plasma-cyan/40' },
];

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getAvatarStyle(username: string) {
  return PALETTE[hashString(username) % PALETTE.length];
}

export function getInitials(username: string) {
  return username.trim().slice(0, 2).toUpperCase() || '??';
}
