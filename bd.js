const ferramentas = {
    "1": { id: 1, nome: "Martelo", preco: 20 },
    "2": { id: 2, nome: "Chave de Fenda", preco: 13 },
    "3": { id: 3, nome: "Serrote", preco: 40 }
}

const sequence = {
    _id: 4,
    get id() {
        return this._id++
    }
}
function listferramentas() {
    return Object.values(ferramentas)
}

function getItem(id) {
    return ferramentas[id]
}
function createItem(item) {
    item.id = sequence.id
    ferramentas[item.id] = item
    return item
}
module.exports = { listferramentas, createItem, getItem }
