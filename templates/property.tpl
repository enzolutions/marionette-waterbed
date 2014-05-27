<div id="property-details" class="container span8">
  <h2><%= node.title %></h2>
  <div id="banner-fade">
    <ul class="bjqs">
    <% _.each(node.field_pictures.und, function(picture) { %>
      <li><img src="<%= picture.uri %>"/></li>
    <% }); %>
    </ul>
  </div>
  <div class='description'>
    <%= node.body.und[0].safe_value %>
  </div>
</div>
<div id="owner-details" class="container span4">
  <div class="panel-body">
    <div class="panel-border panel clearfix">
      <span class="beveled-media-box">
        <img src="<%= node.owner_picture%>">
      </span>

      <div class="user_info">
        <h3 class="name shift">
          <%= node.name %>
        </h3>
        <h6>Member since <%= node.owner_member_since %></h6>
      </div>
      <div class="panel-header-light">
        <h4><%= node.field_address_auto_complete.und[0].value %></h4>
      </div>
    </div>
  </div>
</div>
<div id="property-price" class="container span4">
  <div class="panel-body-2 panel-dark">
    <div class="panel-border panel clearfix">
      <div id="price_date" itemprop="price" class="h1 text-special">
        <%= node.date %>
      </div>
      <div id="price_amount" itemprop="price" class="h1 text-special">
        $ <%= node.price %>
      </div>
    </div>
  </div>
</div>
