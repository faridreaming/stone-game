let shiftElement = (arr, times, direction) => {
  if (times === 0) return arr;
  const n = arr.length;
  times %= n; // Menggunakan modulo untuk menghindari pergeseran berulang
  if (times < 0) times += n; // Menyesuaikan nilai times jika negatif

  let shifted = [...arr];
  for (let i = 0; i < times; i++) {
    if (direction === "r") {
      let lastElement = shifted.pop();
      shifted.unshift(lastElement);
    } else if (direction === "l") {
      let firstElement = shifted.shift();
      shifted.push(firstElement);
    }
  }
  return shifted;
};

let rows = [
  [2, 2, 3, 2, 3, 2],
  [3, 2, 3, 3, 2, 3],
  [2, 2, 3, 2, 2, 2],
  [2, 3, 1, 3, 1, 2],
];

let expectedResults = [11, 11, 9];
let rowResults = [];
rowResults = [];
for (let i = 0; i < 6; i += 2) {
  let result = 0;
  for (let j = 0; j < rows.length; j++) {
    result += rows[j][i];
  }
  rowResults.push(result);
}

let movementsNeeded = [];

// Periksa setiap baris dan hitung gerakan yang diperlukan untuk menyamakan hasil
for (let i = 0; i < rows.length; i++) {
  let movements = 0;
  let currentRow = [...rows[i]]; // Salin baris saat ini untuk diubah
  let currentResult = rowResults[i]; // Hasil baris saat ini

  // Lakukan pergeseran hingga hasil rowResults sama dengan expectedResults
  while (currentResult !== expectedResults[i]) {
    currentRow = shiftElement(currentRow, 1, "l"); // Geser ke kiri
    currentResult = currentRow.reduce((acc, val) => acc + val, 0); // Hitung hasil baru

    movements++; // Tambahkan jumlah gerakan
  }

  movementsNeeded.push(movements); // Simpan jumlah gerakan yang diperlukan untuk baris ini
}

console.log("Jumlah gerakan yang diperlukan untuk setiap baris:", movementsNeeded);
