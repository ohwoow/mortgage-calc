// текстовые инпуты
const totalCost = document.getElementById('total-cost'),
      initialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

// range инпуты
const totalCostRange = document.getElementById('total-cost-range'),
      initialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

// итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

// все инпуты range
const inputsRange = document.querySelectorAll('.input-range')

// все инпуты number
const inputsNums = document.querySelectorAll('.input-num')


// все кнопки с % ставкой
const bankBtns = document.querySelectorAll('.bank')




// Все банки
const banks = [
  {
    name: 'alfa',
    percent: 8.7
  },
  {
    name: 'sberbank',
    percent: 8.4
  },
  {
    name: 'pochta',
    percent: 7.9
  },
  {
    name: 'tinkoff',
    percent: 9.2
  },
]
// текущий процент
let currentPercent = banks[0].percent

// выбираем банк
for (let bank of bankBtns) {
  bank.addEventListener('click', () => {
    for (let item of bankBtns) {
      item.classList.remove('active')
    }
    bank.classList.add('active')
    takeActiveBank(bank)
  })
}

//вычисляем итоговые значения переключая инпуты
for (let input of inputsRange) {
  input.addEventListener('input', () => {
    assignValue()
    calculation(totalCost.value, initialFee.value, creditTerm.value)
  })
}

for (let input of inputsNums) {
  input.addEventListener('change', () => {
    totalCostRange.value = totalCost.value
    initialFeeRange.value = initialFee.value
    creditTermRange.value = creditTerm.value
    calculation(totalCost.value, initialFee.value, creditTerm.value)
  })
}

// Присваиваем значение инпутов к инпут range
const assignValue = () => {
  totalCost.value = totalCostRange.value
  initialFee.value = initialFeeRange.value
  creditTerm.value = creditTermRange.value
}


//выбираем процент банка
const takeActiveBank = currentActive => {
  const dataValue = currentActive.dataset.name
  const currentBank = banks.find(bank => bank.name === dataValue)
  currentPercent = currentBank.percent
  calculation(totalCost.value, initialFee.value, creditTerm.value)
}

const calculation = (totalCost = 0, initialFee = 100000, creditTerm = 1) => {
  /*
   ЕП - ежемесячные платеж
   РК - Размер кредита
   ПС - Процентная ставка
   КМ - Количество месяцев

   Формула: EП = (РК + ((( РК / 100) * ПС) / 12 ) * КМ) / КМ
  */

  let monthlyPayment // ЕП
  let loanAmount = totalCost - initialFee; // РК
  let interestRate = currentPercent // ПС
  let numberOfYears = creditTerm // Количество лет
  let numberOfMonth = 12 * numberOfYears // КМ

  monthlyPayment = (loanAmount + (((loanAmount / 100) * interestRate) / 12) * numberOfMonth) / numberOfMonth

  const monthlyPaymentRounded = Math.round(monthlyPayment)
  const recommendedIncome = Math.round(monthlyPaymentRounded + ((monthlyPaymentRounded / 100) * 35))

  if (monthlyPayment > 0) {
    totalAmountOfCredit.textContent = `${loanAmount} ₽`
    totalMonthlyPayment.textContent = `${monthlyPaymentRounded} ₽`
    totalRecommendedIncome.textContent = `${recommendedIncome} ₽`

  } else {
    totalAmountOfCredit.textContent = `0 ₽`
  }
}

assignValue()















