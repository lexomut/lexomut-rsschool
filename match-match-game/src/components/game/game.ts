import {BaseComponent} from "../base-component";
import {CardsField} from "../cards-field/cards-field";
import {Card} from "../card/card";
import {delay} from "../../shared/delay";

const FLIP_DELAY=3000;


export class Game extends BaseComponent{
  private readonly cardsField: CardsField;
  private activeCard? : Card;
  private isAnimation=false;
  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element)


  }
newGame(images:string[]){
      this.cardsField.clear()
    const cards=images
      .concat(images)
      .map((url)=> new Card(url))
      .sort(()=>Math.random()-.5)
cards.forEach((card)=>{
   card.element.addEventListener('click', ()=>{this.cardHandler(card)})
});

  this.cardsField.addCards(cards)
}
private async cardHandler(card:Card){
    if (this.isAnimation){console.log(this.isAnimation);return;}
    if(card.isFlipped) return
    this.isAnimation=true
  console.log('click')
  console.log('до flip')
   await card.flipToFront();
  console.log('после flip')
   if(!this.activeCard){
     this.activeCard = card;
     this.isAnimation=false;
     return;
   }

     if (this.activeCard.image !== card.image) {
       console.log('перед паузой')
       await delay(FLIP_DELAY);
       console.log('после паузы')
       await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
     }


   console.log('конец функции')
  this.activeCard=undefined;
  this.isAnimation=false;
}
}