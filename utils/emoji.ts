export function removeEmoji(content: string) {
  let conByte = new TextEncoder().encode(content)

  for (let i = 0; i < conByte.length; i++) {
    if ((conByte[i] & 0xF8) == 0xF0) {
      for (let j = 0; j < 4; j++) {
        conByte[i + j] = 0x30
      }

      i += 3
    }
  }
  content = new TextDecoder('utf-8').decode(conByte)
  return content.replaceAll('0000', '')
}