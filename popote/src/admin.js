

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          nbRecettes:null,
          nbUsers:null,
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration du site</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
          <table> \
            <th> \
                <td>Variable</td> \
                <td>Valeur</td> \
            </th> \
            <tr> \
                <td>nombre de users</td> \
                <td>nbUsers</td> \
            </tr> \
            <tr> \
                <td>nombre de recettes</td> \
                <td>nbRecettes</td> \
            </tr> \
          </table> \
        </div> \
      ',
      methods: {
        //---------------------------------
        //
        //  UpdateTime
        //
        //---------------------------------
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
      }
}

