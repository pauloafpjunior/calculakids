import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';
import { Toast } from '../services/toast';

type GiftInfo = {
  image: string,
  title: string,
  content: string
}

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss'],
})
export class GiftsComponent {

  constructor(private platform: Platform, private toastCtrl: Toast) {

  }

  gifts = [
    {
      image: "gift1.jpg",
      title: "Diário para o bebê",
      content: "Sabe aquela sua amiga que está grávida ou acabou de dar à luz? Com certeza ela adoraria ganhar um diário para o novo bebê. Não precisa ser nada elaborado, um caderno com uma capa dura bem bonita já é o suficiente! Você pode acrescentar uma linda caneta também e um recadinho dizendo pra ela utilizar o presente para registrar os momentos especiais para ler com o/a pequeno/a no futuro. Presente para a vida toda!!"
    },
    {
      image: "gift2.jpg",
      title: "Massinha de modelar caseira",
      content: "Super fácil de fazer e com ingredientes que vocẽ tem em casa. Use corante alimentício para dar a cor ou se quiser deixar colorido e com cheirinho de fruta, é só acrescentar suco de saquinho. Isso mesmo! Confira a receita no link abaixo. Finalize com uma embalagem bem bonita."
    },
    {
      image: "gift3.jpg",
      title: "Vasinho de ervas",
      content: "Uma lata bonita ou uma floreira de plástico, você escolhe! Sugestão de plantas: Hortelã, Salsinha, Cebolinha, Manjericão. Acrescente uma plaquinha feita com palito de churrasco e E.V.A (com um pouco de imaginação, pode pensar em outros materiais) com uma frase legal. Sugestão: “Horta da Jú”, “Quem planta amor, colhe felicidade”, “Cultive a Felicidade”."
    },
    {
      image: "gift4.jpg",
      title: "Aromatizador de ambiente",
      content: "Anote aí: uma medida de vodka (pode ser uma bem baratinha) para duas de água + algumas gotas de óleo essencial. Está pronto um excelente aromatizador. Sugestão de essências: Menta, Canela, Cravo, Laranja ou Lavanda. Coloque em um borrifador bem bonito ou decore um borrifador simples. Tenho certeza que vai amar o resultado!"
    },
    {
      image: "gift5.jpg",
      title: "Biscoitinhos ou docinhos caseiros",
      content: "Prepare biscoitos ou doces e coloque em uma embalagem bonita. Uma ideia é reutilizar potes de vidro e colocar uma fita bem linda. Presente com muito amor e sabor!"
    }
  ]

  gift = 1

  getFill(value: number): string {
    return this.gift === value ? "solid" : "outline"
  }

  get currentGift() {
    return this.gifts[this.gift - 1]
  }


  async share() {
    try {
      await Share.share({
        title: 'CalculaKids',
        text: 'Economize com o CalculaKids: ',
        url: 'https://calculakids.com/gifts',
        dialogTitle: 'Compartilhe com seus amigos',
      });
    } catch (error) {
      this.toastCtrl.showMessage('Erro ao compartilhar!', 'error');
    }
  }


  get isShareable(): boolean {
    return this.platform.is('mobileweb');
  }

}
