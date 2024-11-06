// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


contract Lib {

    constructor(){
        admin = msg.sender;
    }

    address admin;

    struct Book {
        string name;
        string image;
        bool free;
    }

    mapping (uint => Book) public book;
    mapping (uint => address) holder;

    uint public amountOfBooks;

    //----------Администрирование
    function addBook(string memory _name, string memory _image) public {
        require(msg.sender == admin, "Not admin");
        book[amountOfBooks] = Book(_name, _image, true); 
        amountOfBooks++; 
    }

    function withdrawFunds() public {
        // + Проверить что это админ
        uint balance = address(this).balance;
        payable(admin).transfer(balance);
    }


    //ToDo: Обновить администратора.

    //ToDo: Удалить книгу из библиотеки

    //----------Аренды
    function giveBook(uint _bookId) public payable {
        require(msg.value >= 1 ether, "Add funds");
        // + Проверка что книга отдана
        require(amountOfBooks>=_bookId, "Not exists");

        // Отправить книгу пользователю
        book[_bookId].free = false;
        holder[_bookId] = msg.sender;
    }

    //ToDo: Вернуть книгу

    //ToDo: У кого книга на руках?

}
