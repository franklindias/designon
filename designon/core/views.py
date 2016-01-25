from django.shortcuts import render 
from django.http import HttpResponse
from django.template.loader import render_to_string
from datetime import datetime   
from django.core import mail

def home(request):
    if request.method == 'POST':
        
        servicos = ''
        
        for serv in request.POST.getlist('servico'):
            servicos += serv+', '
            
        object = {'nome':request.POST['name'],
                  'email':request.POST['email'],
                  'ambiente':request.POST['tipo_ambiente'],
                  'tamanho':request.POST['size'],
                  'obs':request.POST['message'],
                  'servicos':servicos,
                  'data_solicitacao':datetime.now()}
        
        body = render_to_string('orcamentos/solicitacao_orcamento.txt', object)
        
        mail.send_mail('Solicitação de Orçamento',
                       body,
                       request.POST['name']+' <'+request.POST['email']+'>',
                       ['designon.arq@gmail.com'],
                       html_message=body
                      )
        
        body = render_to_string('orcamentos/agradecimento.txt', object)
        
        mail.send_mail('[DesignOn] - Obrigado!',
                       body,
                       'DesignOn <designon.arq@gmail.com>',
                       [request.POST['email']],
                       html_message=body
                      )
        
        return render(request, 'sucesso.html')
    
    return render(request, 'index.html')