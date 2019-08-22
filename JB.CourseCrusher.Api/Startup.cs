using AutoMapper;
using JB.CourseCrusher.Api.Data;
using JB.CourseCrusher.Api.Data.Repositories.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string ReactClientPolicy = "ReactClientPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CourseCrusherContext>();
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
            //    .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));
            services.AddCors(options =>
            {
                options.AddPolicy(ReactClientPolicy,
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000");
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            // Get Access Token https://login.microsoftonline.com/1f4c8d27-4bf8-49ce-8e50-a931600c5cd9/oauth2/authorize?client_id=08021e04-07bb-4f07-b0fa-506546b2b637&response_type=id_token&redirect_uri=https%3A%2F%2Flocalhost:44379%2Fsignin-oidc&nonce=12345

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(ReactClientPolicy);
            app.UseHttpsRedirection();
            //app.UseAuthentication();

            app.UseMvc();
        }
    }
}
