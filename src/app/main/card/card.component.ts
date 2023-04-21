import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) {

    this.faqs = [];
  }

  ngOnInit(): void {
    this.http.get('https://api-staging2.terapiadebolso.com.br/faq/patients',
      { params: { limit: 50 } }).subscribe(data => {
      this.faqs = formatFaqsData(data);
    });
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

const formatFaqsData = (data: any) => {
  return data.results.map((faq: any) => {
    return {
      id: faq.id,
      question: faq.question_text,
      answer: faq.answer_text,
      state: "inactive"
    }
  })
}
