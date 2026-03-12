import QRCode from 'qrcode'
// @ts-ignore
import bwipjs from 'bwip-js'

/**
 * Generates a real QR code PNG as a base64 data URL.
 * Links to the public verification page.
 */
export async function generateQR(memberId: string, appUrl: string): Promise<string> {
  const url = `${appUrl}/verify/${memberId}`
  return QRCode.toDataURL(url, {
    width:                300,
    margin:               2,
    errorCorrectionLevel: 'H',
    color: {
      dark:  '#2D0008',   // deep crimson modules
      light: '#F5E6D0',   // cream background
    },
  })
}

/**
 * Generates a real Code128 barcode PNG as a base64 data URL.
 * White bars on dark crimson — matches card back design.
 */
export async function generateBarcode(memberId: string): Promise<string> {
  const png: Buffer = await bwipjs.toBuffer({
    bcid:            'code128',
    text:            memberId,
    scale:           3,
    height:          12,       // bar height in mm
    includetext:     true,
    textxalign:      'center',
    textsize:        9,
    textcolor:       'F5E6D0', // cream text
    barcolor:        'F5E6D0', // cream bars
    backgroundcolor: '2D0008', // deep crimson bg
    padding:         4,
  })
  return `data:image/png;base64,${png.toString('base64')}`
}