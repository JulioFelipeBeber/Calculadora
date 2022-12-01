window.MVL={
    Calculadora:{
        container:function() {
            return $("#product_form .js-quantity").closest(".form-row");
        },
        field:"#product_form .js-quantity-input",
        Ref: 0.4,
        Tag: 'm2',
        ResetApp: function () {

            $(".modulo-calculadora").html('');
            $(".modulo-calculadora").remove();

        },

        ValidationVariation: function() {
            var variant= $("#variation_1");
            var finder="Personalizado";
            if (variant.val()==finder) {
                return true;

            }
            else {

              return false;

            }

        },

        RefNum: function() {
            var tags= LS.product.tags;
           // var tagRef= this.Tag;
            tags.forEach(function(tag,k) {
                var tag_array=tag.split(":");
                if(tag_array.length>1 && tag_array[0]==MVL.Calculadora.Tag ) {
                    console.log(tag_array);
                    MVL.Calculadora.Ref = tag_array[1];


                }
            });

        },
          init:function() {
            this.RefNum();
            console.log(this.Ref);
            console.log(MVL.Calculadora.Ref);
            var tags= LS.product.tags;
            if(!tags.includes(this.Tag)){
                return false;
            }

            if(!this.ValidationVariation()) {

                this.ResetApp();
                return false;
            }


            if($(".modulo-calculadora").length>0){
                $(".modulo-calculadora").remove();
            }
            console.log("appiniciado");
            var html='<div class="modulo-calculadora mb-5" style="display:none"><label class="mb-2 d-block font-weight-bold"> Calcule a quantidade de itens necessários para seu pedido </label><br><div class="modulo-calculadora-form d-md-flex"></div> <div class="modulo-calculadora-alerta mt-4"></div></div>';
                this.container().before(html);
            var largura='<input type="text" class="js-calculadora-largura form-control mb-2 mb-md-0 mr-md-1" name="properties[Largura]" placeholder="Largura"/>';
            var altura= '<input type="text" class="js-calculadora-altura  form-control mb-2 mb-md-0 mr-md-1 "name="properties[Altura]"  placeholder="Altura"/>';
            var botao='<a  class="js-calculadora-botao btn btn-primary">Calcular</a>';
            $( ".modulo-calculadora .modulo-calculadora-form").append(largura);
            $( ".modulo-calculadora .modulo-calculadora-form").append(altura);
            $( ".modulo-calculadora .modulo-calculadora-form").append(botao);
            $( ".js-calculadora-botao").on("click",function(){
                var larguravalue = $(".js-calculadora-largura").val().replace(",",".");
                var alturavalue = $(".js-calculadora-altura").val().replace(",", ".");
                console.log(larguravalue,alturavalue);
                var resultado= larguravalue*alturavalue;
                var quantidadeInicial= resultado/MVL.Calculadora.Ref;
                var quantidade=Math.ceil(quantidadeInicial)
                console.log(quantidade);
                $(MVL.Calculadora.field).val(quantidade);
                var preco= $(".js-price-display").data("product-price");
                var precoNovo= LS.formatToCurrency((preco*quantidade) / 100);
                var aviso= '<div class="alert alert-info"> Você tem '+resultado.toFixed(2)+' m² e serão necessários '+quantidade+' itens.<br><strong>Total: '+precoNovo+'</strong> </div>';
                $(".modulo-calculadora-alerta").html(aviso);
            });
            $(".modulo-calculadora").slideDown('slow');
        }

    }
}
MVL.Calculadora.init();
LS.registerOnChangeVariant( function() {
    MVL.Calculadora.init()
}) ;
