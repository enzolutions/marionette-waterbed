<div id="results">
<% if (_.size(items) > 0 ) { %>
<% _.each(items, function(item){ %>
  <div class="item property-<%= item.nid %>">
      <a href="property/<%= item.nid %>/<%= item.date %>">
        <img src="<%= _.first(_.string.words(item.images,',')) %>"/>
      </a>
       <a href="#property/<%= item.nid %>/<%= item.date %>">
        <p class="legend text-center"><%= item.legend.length > 30 ? item.legend.slice(0, 30).concat('...') : item.legend %></p>
      </a>

      <div class="listing-footer clearfix">
        <span class="listing-room-type text-left"><%= item.type %></span>
        <a class="listing-price" href="#property/<%= item.nid %>/<%= item.date %>">
          <span class="shift text-special price">
            <span class="currency">$</span>
            <span class="h2 price-amount"><%= item.rooms_availability_index_price %></span>
          </span>
          <span class="price-sub">
                  Per night
          </span>
        </a>
      </div>
  </div>
<% }); %>
<% } else { %>
<div>
  <div class="alert alert-warning text-center">
    <strong>Warning: </strong> There are no results for your given selection criteria, please try again.
  </div>
</div>
<% } %>
</div>
