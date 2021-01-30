import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('dividerTrigger', [
      state('inactive', style({marginTop: "-30px"})),
      state('active', style({marginTop: "15px"})),
      transition("inactive <=> active", animate("300ms")),
    ]),
    trigger('answerTrigger', [
      state('inactive', style({opacity: "0", transform: "translateY(-40px)"})),
      state('active', style({opacity: "1", transform: "translateY(0px)"})),
      transition("inactive <=> active", animate("300ms")),
    ])
  ]
})
export class CardComponent implements OnInit {

  faqs      : Array<any>;
  faqState  : string = "inactive";

  constructor() {
    this.faqs=[
      {
        id: 1,
        question: "How many team members can I invite?",
        answer: "No more than 2GB. All files in your account must fit your allocatted storage space",
        state: "inactive"
      },
      {
        id: 2,
        question: "What is the maximum file upload size",
        answer: "No more than 2GB. All files in your account must fit your allocatted storage space",
        state: "inactive"
      },
      {
        id: 3,
        question: "How do I reset my password",
        answer: "No more than 2GB. All files in your account must fit your allocatted storage space",
        state: "inactive"
      },
      {
        id: 4,
        question: "Can I cancel my suscription?",
        answer: "No more than 2GB. All files in your account must fit your allocatted storage space",
        state: "inactive"
      },
      {
        id: 5,
        question: "Do you provide additional support?",
        answer: "No more than 2GB. All files in your account must fit your allocatted storage space",
        state: "inactive"
      }
    ]
  }

  ngOnInit(): void {
  }

  faqAction(key: number){

    if(this.faqs[key].state=="inactive"){
      this.faqs.map((faq, key) => {
        if(faq.state=="active"){
          this.faqs[key].state='inactive'
        }
      })
    }

    this.faqs[key].state=this.faqs[key].state == "active" ? "inactive": "active";
  }

}
