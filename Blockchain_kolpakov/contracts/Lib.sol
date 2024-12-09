// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.2 <0.9.0; 
 
 
contract Lib { 
 
    constructor(){ 
        admin = msg.sender; 
    } 
 
    address public admin; 
 
    struct Book { 
        string name; 
        string image; 
        bool free; 
    } 

    modifier isAdmin 
    { 
        require(admin == msg.sender, "Not admin");
        _;
    }
    modifier isBookExist(uint _bookId) 
    { 
        require(amountOfBooks>=_bookId, "Not exists"); 
        _;
    } 
 
    mapping (uint => Book) public book; 
    mapping (uint => address) holder; 
 
    uint public amountOfBooks; 
 
    //----------Администрирование 
    function addBook(string memory _name, string memory _image) public isAdmin { 
        book[amountOfBooks] = Book(_name, _image, true); 
        amountOfBooks++; 
    } 

    function withdrawFunds() public isAdmin{ 
        uint balance = address(this).balance; 
        payable(admin).transfer(balance); 
    } 

    //ToDo: Обновить администратора.
    function updateAdmin(address _newAdmin) public isAdmin{
        admin = _newAdmin;
    }

    //ToDo: Удалить книгу из библиотеки
    function deleteBook(uint _bookId) public isAdmin{
        delete(book[_bookId]);
        amountOfBooks--;
    }
 
    //----------Аренды 
    function giveBook(uint _bookId) public payable { 
        require(msg.value >= 1 ether, "Add funds"); 
        // + Проверка что книга отдана 
        require(book[_bookId].free == true, "Not available");
        
 
        // Отправить книгу пользователю 
        book[_bookId].free = false; 
        holder[_bookId] = msg.sender; 
    } 
 
    //ToDo: Вернуть книгу
    function returnBook(uint _bookId) public isBookExist(_bookId) { 
        require(msg.sender == holder[_bookId], "Not owner");

        book[_bookId].free = true;
        holder[_bookId] = address(0);
    }   

    //ToDo: У кого книга на руках?
    function whoHasBook(uint _bookId) public view isBookExist(_bookId) returns (address) {
        return holder[_bookId];
    }
    
}